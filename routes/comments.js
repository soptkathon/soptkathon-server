var express = require("express");
var router = express.Router();
const commentController = require("../controllers/comments");

router.get("/:musicIdx", commentController.commentSearch);

module.exports = router;