const pool = require("../modules/pool");
const table = "user";

const user = {
  signup: async (id, password, salt) => {
    const fields = "id, password, salt";
    const questions = `?, ?, ?`;
    const values = [id, password, salt];
    const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
    try {
      const result = await pool.queryParamArr(query, values);
      const insertId = result.insertId;
      return insertId;
    } catch (err) {
      if (err.errno == 1062) {
        console.log("signup ERROR : ", err.errno, err.code);
        return -1;
      }
      console.log("signup ERROR : ", err);
      throw err;
    }
  },
  checkUser: async (id) => {
    const query = `SELECT * FROM ${table} WHERE id='${id}';`;
    try {
      const result = await pool.queryParam(query);
      console.log(result);
      return result;
    } catch (err) {
      if (err.errno == 1062) {
        console.log("checkUser ERROR : ", err.errno, err.code);
        return -1;
      }
      console.log("checkUser ERROR : ", err);
      throw err;
    }
  },
};

module.exports = user;
