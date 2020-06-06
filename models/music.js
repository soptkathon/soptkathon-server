const pool = require("../modules/pool");
const table = "music";

const music = {
  showList: async () => {
    const query = `SELECT * FROM ${table}`;
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
};

module.exports = music;
