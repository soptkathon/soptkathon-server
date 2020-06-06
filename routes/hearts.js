var express = require("express");
var router = express.Router();
const heartController = require("../controllers/hearts");

router.put("/:musicIdx/:isChecked", heartController.updateHearts);

module.exports = router;
