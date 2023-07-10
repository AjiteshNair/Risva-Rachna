const mongoose = require("mongoose");
const userModal = require("../models/user.js");

const url = "mongodb+srv://root:root@urlshortner.uwmkrzq.mongodb.net/";
let _userModel;
const getUserModel = () => {
  if (_userModel) return _userModel;

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));

  const userSchema = new mongoose.Schema(userModal);

  _userModel = mongoose.model("login", userSchema);
  return _userModel;
};

const login = async ({ username, password }, res) => {
  let error = false;
  // Checking if user exists
  const User = getUserModel();
  const userExists = await User.findOne({ user: username });
  let message = false,
    data = false;
  if (userExists) {
    if (userExists.password == password) {
      message = "logged in";
      data = userExists;
      // console.log(`logged in! Welcome ${username}`);
      //return res.status(200).json({ status:true , message: 'Logged In' });
    } else message = "incorrect credentials";
  } else message = "no such user exists";
  return res.status(200).json({ error, status: !!data, data, message });
};
module.exports = {
  login,
};
