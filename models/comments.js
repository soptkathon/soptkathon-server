const pool = require("../modules/pool");
const table3 = "comments";

const comments = {
    commentSearch : async (musicIdx) => {
        const query = `SELECT * FROM ${table3} WHERE musicIdx = ${musicIdx};`;
        try {
          const result = pool.queryParam(query);
          return result;
        } catch (err) {
          if (err.errno == 1062) {
            console.log("commentSearch ERROR : ", err.errno, err.code);
            return -1;
          }
          console.log("commentSearch ERROR : ", err);
          throw err;
        }
      },
};

module.exports = comments;