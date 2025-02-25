const mongoose = require("mongoose");
const Auth = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports = {
  register: (req, res) => {
    console.log("Reg hit", req);

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
        res.json({ msg: "Bag Login"});
      }
    });
  },

  authCheck: (req, res) => {
    console.log("Auth Check", req.headers.cookie);
  }
};
