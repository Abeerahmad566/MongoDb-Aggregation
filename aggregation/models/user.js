var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    role: String,
    department: String,
    post: String,
    skills: Array,
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
