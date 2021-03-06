const UserModel = require("../models/user");
const encrypt = require("../modules/crypto");
const statusCode = require("../modules/statusCode");
const resMessage = require("../modules/responseMessage");
const util = require("../modules/util");
const jwt = require('../modules/jwt');

const user = {
    signup : async (req, res) => {
        const { 
            id, 
            password 
        } = req.body;
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
        const { salt, hashed } = await encrypt.encrypt(password);
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
    },
    signin : async (req, res) => {
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
      }
}

module.exports = user;