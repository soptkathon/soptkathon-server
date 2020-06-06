var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const result = {
    status: 200,
    message: "api test",
  };
  res.status(200).send(result);
});

router.use("/user", require("./user"));
router.use("/music", require("./music"));
router.use("/hearts", require("./hearts"));

module.exports = router;
