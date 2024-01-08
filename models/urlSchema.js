const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const shortUrlSchema = new Schema(
  {
    full: {
      type: String,
      require: true,
    },
    short: {
      type: String,
      require: true,
      default: shortid.generate,
    },
    clicks: {
      type: Number,
      require: true,
      default: 0,
    },
    expiresAt: {
      type: Date,
      default: function () {
        // Set expiration date to 48 hours from now
        return new Date(Date.now() + 48 * 60 * 60 * 1000);
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ShortURL', shortUrlSchema);
