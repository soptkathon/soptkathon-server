var express = require('express');
var router = express.Router();
const musicController = require('../controllers/music');

router.get("/list", musicController.showList);

module.exports = router;