const express = require("express");
const session = require("express-session");
const path = require("node:path");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const util = require("./utils/authUtils");

require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

require("./config/passport");

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.parentId = null;
  // res.locals.directory = "";
  next();
});

const loginRoute = require("./routes/LoginRoute");
app.use("/login", loginRoute);

const signupRoute = require("./routes/SignupRoute");
app.use("/signup", signupRoute);

const cloudRoute = require("./routes/CloudRoute");
app.use("/cloud", cloudRoute);

const { getOneFileById } = require("./prisma/queries");
// TODO: Implement user verification for downloading the files
app.get("/download/:fileId", async (req, res) => {
  const file = await getOneFileById(req.params.fileId);
  res.download(file.directory);
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

app.use("/", util.isAuth, (req, res) => res.redirect("/cloud"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
  console.log(`Link is http://localhost:${PORT}/`);
});
