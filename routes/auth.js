const express = require('express');
const router = express.Router();
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

router.get('/local', async (req, res) => {
    // 헤더에 있는 token 값 가져오기
    var token = req.headers.token;
    if (!token) {
        return res.json(util.fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN));
    }
    const user = await jwt.verify(token);
    if (user == TOKEN_EXPIRED) {
        return res.json(util.fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
    }
    if (user == TOKEN_INVALID) {
        console.log(user);
        return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
    }
    if (user.idx == undefined) {
        console.log(user);
        return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
    }
    return res.json(util.success(CODE.OK, MSG.AUTH_SUCCESS, {userIdx: user.idx}));
});

module.exports = router;