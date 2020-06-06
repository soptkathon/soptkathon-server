var express = require("express");
var router = express.Router();

const CommentModel = require("../models/comments");
const encrypt = require("../modules/crypto");
const statusCode = require("../modules/statusCode");
const resMessage = require("../modules/responseMessage");
const util = require("../modules/util");

router.get("/:musicIdx", async (req, res) => {
    const musicIdx = req.params.musicIdx;
  const result = await CommentModel.commentSearch(musicIdx);

  if(result.length < 1){
    return res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_COMMENTS_DATA));
  }

  res.status(statusCode.OK)
  .send(util.success(statusCode.OK, resMessage.COMMENTS_SUCCESS, {data: result})); 
});

module.exports = router;