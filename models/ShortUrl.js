const { Schema, model } = require('mongoose');

const ShortUrlSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  originalUrl: String,
  shortCode: { type: String, unique: true },
  customAlias: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  clicks: { type: Number, default: 0 },
});

module.exports = model('ShortUrl', ShortUrlSchema);