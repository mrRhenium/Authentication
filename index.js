// import different types of library
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./model/user");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// import other files and folders
const corsProtection = require("./protection/cors_folder/corsproperty");
const verifyUser = require("./protection/authentication/authenticate");

// define variables
const port = 3000;
const databaseUrl = "mongodb://localhost:27017/authentication";

//
// ********************************************
// connecting to the database
// *********************************************
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("database also connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ********************************************
// using middlewares
// *********************************************

// 1. body parser -->
//  parse the upcoming req.body (json body) from the client
app.use(bodyParser.json());

// 2. urlencoded : false means parse querystring
// parse the req.body (url formate body) from the client browser
app.use(bodyParser.urlencoded({ extended: false }));

// 3. parse the upcoming cookies
app.use(cookieParser());

// 4. cors
// share the data/info from other servers to our server
app.use(corsProtection);
//
//

// ********************************************
// redirec to diffrent type of pages
// *********************************************

app.use(passport.initialize());

passport.use(
  new LocalStrategy({ usernameField: "name" }, function (
    username,
    password,
    done
  ) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

app.post("/user/login", passport.authenticate("local"), (req, res) => {
  res.send("hello World !! Home page of WebApp");
});

//1. home page of webApp
app.get("/", verifyUser, (req, res) => {
  // console.log(req.cookies);
  res.send("hello World !! Home page of WebApp");
});

// 2. user page
const userRouter = require("./routes/userRouter");
// app.use("/user", userRouter);

// **************************
// listening the port at port no 3000
// **************************
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
