const { Schema, model } = require('mongoose');

const ClickSchema = new Schema({
  shortCode: String,
  timestamp: { type: Date, default: Date.now },
  ip: String,
  device: String,
  browser: String,
  os: String,
});

module.exports = model('Click', ClickSchema);