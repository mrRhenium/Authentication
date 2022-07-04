// import npm node module
const express = require("express");
const cookieParser = require("cookie-parser");
const User = require("../../model/user");

// middlewares
// using middleware to parse the upcoming cookies from client
express().use(cookieParser);

// verify the user on basis of their cookies
const verifyUser = async (req, res, next) => {
  try {
    //
    const userName = req.cookies.user;
    const user = await User.findOne({ name: userName });

    if (user) {
      next();
    } //
    else {
      res.redirect("http://127.0.0.1:5500/public/login.html");
    }

    //
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyUser;
