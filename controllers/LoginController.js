const passport = require("passport");

function loginGet(req, res) {
  res.render("index", { page: "login" });
}

function loginPost() {}

module.exports = {
  loginGet,
  loginPost,
};
