function signupGet(req, res) {
  res.render("index", { page: "signup" });
}

function signupPost() {}

module.exports = {
  signupGet,
  signupPost,
};
