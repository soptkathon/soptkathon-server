const pool = require("../modules/pool");
const table = "music";

const music = {
  showList: async (userIdx) => {
    const query = `SELECT * FROM ${table};`;
    try {
      const result = await pool.queryParam(query);
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
  updateHearts: async (musicIdx, isChecked) => {
    const query = `UPDATE ${table} SET isChecked="${isChecked}" WHERE musicIdx="${musicIdx}";`;
    const query2 = `SELECT title, isChecked FROM ${table} WHERE musicIdx="${musicIdx}";`;
    try {
      await pool.queryParam(query);
      const result = await pool.queryParam(query2);
      return result;
    } catch (err) {
      console.log(" 하트개수 업데이트 실패", err.errno, err.code);
      throw err;
    }
  },
};

module.exports = music;
