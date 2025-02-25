const jwt = require("jsonwebtoken");
const Auth = require("../model/model");

const middleware = (req, res, next) => {

  console.log("MiddleWare Hit!")
  console.log("Auth Check", req.headers.cookie)
  if (!req.headers.cookie) {
    console.log("No Cookie for you!")
    res.json({ msg: "No Cookie" })
  } else {
    console.log("$$$", req.headers.cookie.split("="))
    let split = req.headers.cookie.split("=")
    console.log("Split", split[1])

    const decoded = jwt.verify(split[1], process.env.SECRET_KEY)
      console.log("decoded", decoded)
      req.user = decoded
      next()
  }
  next()
}

module.exports = middleware
