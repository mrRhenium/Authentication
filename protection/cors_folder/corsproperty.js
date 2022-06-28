const cors = require("cors");

const whiteList = [
  "http://localhost:3000",
  "http://localhost:2000",
  "http://127.0.0.1:5500",
];

const corsOptionDelegate = (req, callback) => {
  let corsOptions;

  if (whiteList.indexOf(req.header("Origin")) !== -1) {
    //

    corsOptions = {
      origin: true,
      methods: ["GET", "DELETE"],
    };
    callback(null, corsOptions);

    //
  } else {
    //

    corsOptions = {
      origin: false,
    };
    callback(null, corsOptions);

    //
  }

  //
};

module.exports = cors(corsOptionDelegate);
