// const express = require('express');
// const shortId = require('shortid')
// const createHttpError = require('http-errors')
// const router = express.Router();
// const { ensureAuthenticated } = require('../config/checkAuth')
// // const path = require('path')
// const ShortUrl = require('../models/url.model')

// // //------------ Welcome Route ------------//
// // router.get('/', (req, res) => {
// //     res.render('welcome');
// // });

// // //------------ Dashboard Route ------------//
// // router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dash'));
    


// router.post('/dashboard', async (req, res, next) => {
//     try {
//       const { url } = req.body
//       if (!url) {
//         throw createHttpError.BadRequest('Provide a valid url')
//       }
//       const urlExists = await ShortUrl.findOne({ url })
//       if (urlExists) {
//         res.render('dash', {
//           // short_url: `${req.hostname}/${urlExists.shortId}`,
//           short_url: `${req.headers.host}/${urlExists.shortId}`,
//         })
//         return
//       }
//       const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() })
//       const result = await shortUrl.save()
//       res.render('dash', {
//         // short_url: `${req.hostname}/${urlExists.shortId}`,
//         short_url: `${req.headers.host}/${result.shortId}`,
//       })
//     } catch (error) {
//       next(error)
//     }
//   })

//   router.get('/:shortId', async (req, res, next) => {
//     try {
//       const { shortId } = req.params
//       const result = await ShortUrl.findOne({ shortId })
//       if (!result) {
//         throw createHttpError.NotFound('Short url does not exist')
//       }
//       res.redirect(result.url)
//     } catch (error) {
//       next(error)
//     }
//   })
  
//  router.use((req, res, next) => {
//     next(createHttpError.NotFound())
//   })
  
//  router.use((err, req, res, next) => {
//     res.status(err.status || 500)
//     res.render('dash', { error: err.message })
//   })
  

// module.exports = router;


const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth')


//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome');
});

//------------ Dashboard Route ------------//
// router.get('/shortUrls', ensureAuthenticated, (req, res) => res.render('index', {
//     name: req.user.name
// }));
router.use("/shortUrls", require("./urlRoute"))

module.exports = router;