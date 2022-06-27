// import different types of library
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// import other files and folders
const corsProtection = require("./protection/cors_folder/corsproperty");

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

// 3. cors
// share the data/info from other servers to our server
app.use(corsProtection);
//
//

// ********************************************
// redirec to diffrent type of pages pages
// *********************************************

//1. home page of webApp
app.get("/", (req, res) => {
  res.send("hello World !! Home page of WebApp");
});

// 2. user page
const userRouter = require("./routes/userRouter");
app.use("/user", userRouter);

// **************************
// listening the port at port no 3000
// **************************
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
