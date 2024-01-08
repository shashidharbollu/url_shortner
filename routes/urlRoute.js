const express = require('express');
const router = express.Router();
const ShortURL = require('../models/urlSchema');

router.get('/', async (req, res) => {
  const shorturls = await ShortURL.find();
  res.render('index', { shorturls: shorturls });
});

router.post('/', async (req, res) => {
  console.log("i am inside post", req.body);
  const url = req.body.full;

  const newShortURL = new ShortURL({
    full: url,
  });

  await newShortURL.save();
  res.redirect('/dashboard');
});

router.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortURL.findOne({ short: req.params.shortUrl });

  if (shortUrl == null) {
    // URL not found
    return res.sendStatus(404);
  }

  if (new Date() > shortUrl.expiresAt) {
    // URL has expired, render a page with error message
    return res.render('expired', { message: 'Oops! The link has expired. Links are valid for up to 48 hours only. Dont worry, you can easily generate a fresh link.' });
  }

  await shortUrl.clicks++;
  await shortUrl.save();
  res.redirect(shortUrl.full);
});

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await ShortURL.deleteOne({ _id: id });
    console.log('delete');
    res.redirect('back');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
