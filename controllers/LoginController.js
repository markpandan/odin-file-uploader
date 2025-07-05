const passport = require("passport");

function loginGet(req, res) {
  res.render("index", { page: "login" });
}

const loginPost = passport.authenticate("local", {
  successRedirect: "/cloud",
  failureRedirect: "/login",
  failureMessage: "Username or password is incorrect",
});

module.exports = {
  loginGet,
  loginPost,
};
