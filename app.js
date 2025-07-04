const express = require("express");
// const session = require("express-session");
const path = require("node:path");
// const passport = require("passport");
// const pgSession = require("connect-pg-simple")(session);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// require("./passport");

// app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const loginRoute = require("./routes/LoginRoute");
app.use("/", loginRoute);

const signupRoute = require("./routes/SignupRoute");
app.use("/signup", signupRoute);

const cloudRoute = require("./routes/CloudRoute");
app.use("/cloud", cloudRoute);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
  console.log(`Link is http://localhost:${PORT}/`);
});
