const express = require('express');
const { handleRedirect } = require('../controllers/redirect.controller.js');
const router = express.Router();

router.get('/:code', handleRedirect);

module.exports = router;