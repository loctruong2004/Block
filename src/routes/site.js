const express = require('express');
const router = express.Router();

const sitecontroller = require('../app/controlles/SiteController');

router.get('/search', sitecontroller.search);
router.get('/', sitecontroller.index);

module.exports = router;
