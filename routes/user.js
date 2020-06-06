var express = require("express");
var router = express.Router();
let util = require("../modules/util");
let statusCode = require("../modules/statusCode");
let resMessage = require("../modules/responseMessage");
let encrypt = require("../modules/crypto");
const User = reuqire("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res) => {
  const { id, name, password, email } = req.body;
  if (!id || !name || !password || !email) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  // 사용자 중인 아이디가 있는지 확인
  if (await User.checkUser(id)) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    return;
  }

  const {
    salt,
    hashed
  } = await encrypt.encrypt(password);

  // const salt = "dfw23EFVR3fefnd68FW3r4343";
  // User.push({id, name, password, email});
  const idx = await User.signup(id, name, password, salt, email);
  if (idx === -1) {
    return res
      .status(statusCode.DB_ERROR)
      .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
  }
  res
    .status(statusCode.OK)
    .send(
      util.success(statusCode.OK, resMessage.CREATED_USER, { userId: idx })
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

  const user = await User.checkUser(id);
        if (user[0] === undefined) {
            return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        }
        // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
        // encrypt 모듈 만들어놓은 거 잘 활용하기!
        const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
        if (hashed !== user[0].password) {
            return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
        }
    
        // console.log(user[0]);
        // 로그인 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달 
        // const {token, _} = await jwt.sign(user[0]);
        
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {useridx: user[0].userIdx}));

  // const user = User.filter((user) => user.id == id);
  // if (user.length == 0) {
  //   res
  //     .status(statusCode.BAD_REQUEST)
  //     .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
  //   return;
  // }
  // if (user[0].password !== password) {
  //   res
  //     .status(statusCode.BAD_REQUEST)
  //     .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
  //   return;
  // }
  // res
  //   .status(statusCode.OK)
  //   .send(
  //     util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, { userId: id })
  //   );
});

module.exports = router;
