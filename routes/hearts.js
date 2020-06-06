var express = require("express");
var router = express.Router();
const musicModel = require("../models/music");

const encrypt = require("../modules/crypto");
const statusCode = require("../modules/statusCode");
const resMessage = require("../modules/responseMessage");
const util = require("../modules/util");

router.put("/:musicIdx/:isChecked", async (req, res) => {
  const { musicIdx, isChecked } = req.params;

  if (!musicIdx || !isChecked) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  console.log(1 - isChecked);
  try {
    const heartsUpdateResult = await musicModel.updateHearts(
      musicIdx,
      1 - isChecked
    );

    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          "음악 좋아요 업데이트 성공",
          heartsUpdateResult
        )
      );
  } catch (err) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(statusCode.INTERNAL_SERVER_ERROR, "음악 좋아요 업데이트 실패")
      );
    throw err;
  }
});
module.exports = router;
