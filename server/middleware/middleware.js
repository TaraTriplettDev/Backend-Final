const jwt = require("jsonwebtoken");
const Auth = require("../model/authModel");

const middleware = (req, res, next) => {
  console.log("MiddleWare Hit");
  console.log("Auth Check", req.headers.cookie);

  if (!req.headers.cookie) {
    console.log("No Cookie");
    res.json({ msg: "No cookie" });
  } else {
    console.log("$$$", req.headers.cookie.split("="));
    let split = req.headers.cookie.split("=");
    console.log("SPLIT", split[1]);
    const decoded = jwt.verify(split[1], process.env.SECRET_KEY);
    console.log("decoded", decoded);
    req.user = decoded;
    next();
    // Auth.findById(payload._id)
    //     // Auth.findOne({username: payload.username})
    //     .then(found => {
    //         console.log("found", found)
    //         req.user = found
    //         // res.json({ msg: "valid token", found })
    //         next()
  }
  next();
};
module.exports = middleware;
