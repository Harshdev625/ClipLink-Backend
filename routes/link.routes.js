const express = require('express');
const { createShortUrl, getUserLinks } = require('../controllers/link.controller');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createShortUrl);
router.get('/my-links', auth, getUserLinks);

module.exports = router;