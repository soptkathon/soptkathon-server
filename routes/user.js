var express = require("express");
var router = express.Router();
var crypto = require("crypto");

const UserModel = require("../models/user");
const encrypt = require("../modules/crypto");
const statusCode = require("../modules/statusCode");
const resMessage = require("../modules/responseMessage");
const util = require("../modules/util");
const jwt = require('../modules/jwt');

router.post("/signup", async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }
  // 사용중인 아이디가 있는지 확인
  const result = await UserModel.checkUser(id);
  if (result.length > 0) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    return;
  }
<<<<<<< HEAD
  const { salt, hashed } = await encrypt.encrypt(password);
=======
  const {
    salt,
    hashed
  } = await encrypt.encrypt(password);
>>>>>>> 8d36b53a594cb9a72130ba66ef48a8e55fc7ee1a
  const idx = await UserModel.signup(id, hashed, salt);

  if (idx === -1) {
    return res
      .status(statusCode.DB_ERROR)
      .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
  }

  res
    .status(statusCode.OK)
    .send(
      util.success(statusCode.OK, resMessage.CREATED_USER, { userIdx: idx })
    );
});

router.post("/signin", async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  const user = await UserModel.checkUser(id);
  if (user[0] === undefined) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
  }
  // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
  // encrypt 모듈 만들어놓은 거 잘 활용하기!
  const hashed = await encrypt.encryptWithSalt(password, user[0].salt);

  if (hashed !== user[0].password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
  }

  // 로그인 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
  const {token, _} = await jwt.sign(user[0]);

  res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
      token: token
    })
  );
});

<<<<<<< HEAD
// 마이페이지 조회
// 댓글, 좋아요 누른 뮤직 리스트 반환
// router.get("/mypage", async (req, res) => {
//   const mpHeart = await UserModel.heartSearch();
//   const mpComments = await UserModel.commentSearch();

//   if (mpHeart.length < 1 && mpComments.length < 1) {
//     return res.status(statusCode.BAD_REQUEST)
//     .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_COMMENTS_DATA));
//   }

//   res.status(statusCode.OK)
//   .send(util.success(statusCode.OK, resMessage.COMMENTS_SUCCESS, {mpHeart: mpHeart, mpComments: mpComments}));
// });

=======
>>>>>>> 8d36b53a594cb9a72130ba66ef48a8e55fc7ee1a
module.exports = router;
