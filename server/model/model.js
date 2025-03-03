const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Making a Schema for creating new Auth objects

const AuthSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: Number,
});

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = Auth;
