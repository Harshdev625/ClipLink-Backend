const ShortUrl = require('../models/ShortUrl');
const Click = require('../models/Click');
const uaParser = require('ua-parser-js');

exports.handleRedirect = async (req, res) => {
  const { code } = req.params;
  const shortUrl = await ShortUrl.findOne({ shortCode: code });
  if (!shortUrl) return res.status(404).send('Not found');

  shortUrl.clicks++;
  await shortUrl.save();

  const ua = uaParser(req.headers['user-agent']);

  // Log analytics
  Click.create({
    shortCode: code,
    ip: req.ip,
    device: ua.device.type || 'desktop',
    browser: ua.browser.name,
    os: ua.os.name,
  });

  res.redirect(shortUrl.originalUrl);
};