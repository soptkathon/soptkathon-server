var express = require('express');
var router = express.Router();

const UserModel = require('../models/user');
const musicModel = require('../models/music');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');

router.get("/list", async (req, res) => {
    // const userIdx = req.params.userIdx;
    const musicList = await musicModel.showList();
    if(musicList.length === 0) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_MUSICLIST));
    }

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.SHOW_MUSICLIST_SUCCESS, {musicList: musicList}));
});

module.exports = router;