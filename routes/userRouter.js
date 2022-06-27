// imports libraries
const express = require("express");
const router = express.Router();

// define variable
const User = require("../model/user");

//auth page
router.get("/", (req, res) => {
  res.send("Auth Page");
});

// register page
router
  .get("/register", async (req, res) => {
    try {
      //

      const user = await User.find({});
      res.send(user);

      //
    } catch (err) {
      //

      res.send(err);

      //
    }
  })
  .post("/register", async (req, res) => {
    try {
      //

      const currName = req.body.name;
      const user = await User.findOne({ name: currName });

      if (user) {
        res.send("Already have an Account");
      } //
      else {
        const result = await User.create(req.body);
        res.json(result);
      }

      //
    } catch (err) {
      res.send(err);
    }
  })
  .delete("/register", async (req, res) => {
    try {
      //

      const users = await User.deleteMany();
      res.json(users);

      //
    } catch (err) {
      //

      console.log(err);

      //
    }
  });

router.post("/login", async (req, res) => {
  try {
    //

    const currName = req.body.name;
    const user = await User.findOne({ name: currName });

    if (user && user.password == req.body.password) {
      res.send("SuccessFully Login");
      // res.redirect("/");
    } //
    else if (user && user.password != req.body.password) {
      res.send("password is not match");
    } //
    else {
      res.send("Not have an Account");
    }

    //
  } catch (err) {
    console.log(err);
  }
});

// export the current router to app.js file
module.exports = router;
