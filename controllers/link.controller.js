const ShortUrl = require('../models/ShortUrl');
const { nanoid } = require('nanoid');

exports.createShortUrl = async (req, res) => {
  const { url, alias, expiresAt } = req.body; // <-- Match frontend keys

  const shortCode = alias || nanoid(6);

  const exists = await ShortUrl.findOne({ shortCode });
  if (exists) return res.status(400).json({ message: 'Alias already taken' });

  const newLink = await ShortUrl.create({
    user: req.userId,
    originalUrl: url,           
    shortCode,
    customAlias: alias,         
    expiresAt: expiresAt ? new Date(expiresAt) : null,
  });

  res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
};

exports.getUserLinks = async (req, res) => {
  const links = await ShortUrl.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(links);
};
