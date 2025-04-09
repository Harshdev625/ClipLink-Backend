const ShortUrl = require("../models/ShortUrl");
const Click = require("../models/Click");
const uaParser = require("ua-parser-js");
const requestIp = require("request-ip");

exports.handleRedirect = async (req, res) => {
  const { code } = req.params;
  const shortUrl = await ShortUrl.findOne({ shortCode: code });

  if (!shortUrl) return res.status(404).send("Not found");

  shortUrl.clicks++;
  await shortUrl.save();

  const ua = uaParser(req.headers["user-agent"]);
  const ip = requestIp.getClientIp(req);

  await Click.create({
    shortCode: code,
    ip,
    device: ua.device.type || "desktop",
    browser: ua.browser.name || "Unknown",
    os: ua.os.name || "Unknown",
  });

  res.redirect(shortUrl.originalUrl);
};