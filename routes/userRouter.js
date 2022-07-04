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

      console.log(user);

      if (user) {
        // res.send(JSON.stringify({ msg: "Already have an Account" }));

        res.send({ msg: "Already have an Account" });
      } //
      else {
        const result = await User.create(req.body);
        // res.json(result);
        res.redirect("http://127.0.0.1:5500/public/login.html");

        // res.send(result);
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
      res.send(users);

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
      // res.send({ msg: "SuccessFully Login" });

      res.cookie("user", `${user.name}`, { maxAge: 60000 });
      res.redirect("/");

      //
    } //
    else if (user && user.password != req.body.password) {
      res.send({ msg: "password is not match" });
    } //
    else {
      res.send({ msg: "Not have an Account" });
    }

    //
  } catch (err) {
    console.log(err);
  }
});

// export the current router to app.js file
module.exports = router;
