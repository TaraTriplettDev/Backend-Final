const mongoose = require("mongoose");
const Auth = require("../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports = {
  // This takes in the axios request from handleRegisterSubmit and,
  // if its values pass the requirements, it hashes the password
  // and creates a new Auth containing the values

  register: (req, res) => {
    console.log("Req hit", req);

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

  // This takes in the axios request from handleLoginSubmit and searches the database for a login object matching its username and password

  // If a matching object is found, a token is generated with an expiration date of 1 hour post creation

  login: (req, res) => {
    console.log("login", req.body);

    Auth.findOne({ username: req.body.username }).then((found) => {
      console.log("found", found);
      if (bcrypt.compareSync(req.body.password, found.password)) {
        console.log("Good Login");

        const token = jwt.sign(
          { username: found.username, _id: found._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        console.log("Token", token, {
            httpOnly: true,
            magAge: 3600000,
          })
          .json({ msg: "Good Login", found });
      } else {
        console.log("Bad Login");
        res.json({ msg: "Bad Login" });
      }
    });
  },

  //

  authCheck: (req, res) => {
    console.log("Auth Check", req.headers.cookie);

    if (!req.headers.cookie) {
      console.log("No Cookie");

      res.json({ msg: "No Cookie" });
    } else {
      console.log("$$$", req.headers.cookie.split("="));

      let split = req.headers.cookie.split("");

      console.log("Split", split[1]);

      jwt.verify(split[1], process.env.SECRET_KEY, (err, payload) => {
        if (err) {
          console.log("JWT Error");
          res.json({ msg: "JWT Error" });
        }
        console.log("Payload", payload);
        Auth.findById(payload._id);
        Auth.findOne({ username: payload.username })
          .then((found) => {
            console.log("found", found);
            res.json({ msg: "valid token", found });
          })
          .catch((err) => console.log("err", err));
      });
    }
  },
};
