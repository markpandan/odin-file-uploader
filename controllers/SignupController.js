const db = require("../prisma/queries");
const util = require("../utils/passwordUtils");

function signupGet(req, res) {
  res.render("index", { page: "signup" });
}

async function signupPost(req, res) {
  await db.createNewUser(req.body.username, req.body.email, req.body.password);

  res.redirect("/");
}

module.exports = {
  signupGet,
  signupPost,
};
