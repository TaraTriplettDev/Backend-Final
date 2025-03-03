const mongoose = require("mongoose");
const Auth = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports = {
  // 
  register: (req, res) => {
    console.log("Req hit", req);
    // This takes in the axios request from handleRegisterSubmit and, if its 
    // values pass the requirements, it hashes the password and creates a 
    // new Auth containing the values

    Auth.findOne({ username: req.body.username })
      .then((found) => {
        console.log("found", found);
        if (!found) {
          console.log("Unique Username");
          const hash = bcrypt.hashSync(req.body.password, 10);
          console.log("Hash", hash);

          const newUser = new Auth({
            username: req.body.username,
            password: hash,
          });

          Auth.create(newUser).then((created) => {
            console.log("created", created);
          });
        } else {
          console.log("Username Taken");
        }
      })
      .catch((err) => console.log(err));
  },

  // This takes in the axios request from handleLoginSubmit and, if the 
  // value of the password matches the one associated with the username in 
  // the database, generates a token with the username and an id     

  login: (req, res) => {
    console.log("login", req.body);

    Auth.findOne({ username: req.body.username })
    .then((found) => {
      console.log("found", found);
      // if (bcrypt.compareSync(req.body.password, found.password)) {
      //   console.log("Good Login");

      //   const token = jwt.sign(
      //     { username: found.username, _id: found._id },
      //     process.env.SECRET_KEY,
      //     {
      //       expiresIn: "1h",
      //     }
      //   );

      //   console
      //     .log("Token", token, {
      //       httpOnly: true,
      //       magAge: 3600000,
      //     })
      //     .json({ msg: "Good Login", found });
      // } else {
      //   console.log("Bad Login");
      //   res.json({ msg: "Bad Login" });

      if (bcrypt.compareSync(req.body.password, found.password)) {
        console.log("Good Login")

        const token = jwt.sign({ username: found.username, _id: found._id }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })

        console.log("TOKEN", token)

        res
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 3600000
              })
              .json({ msg: "good login", found })
            } else {
              console.log("Bad Login")
              res.json({ msg: "Bad LOGIN" })
          }
        })
  },
  
//
  authCheck: (req, res) => {
    console.log("Auth Check", req.headers.cookie);
  },
};
