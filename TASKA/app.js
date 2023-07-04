const express = require("express");
const mongoose = require("mongoose");
// const LoginServiceObject  = require("./services/loginService.js");

const app = express();
app.use(express.json());
const port = 3001;
const url = "mongodb+srv://root:root@urlshortner.uwmkrzq.mongodb.net/";

// <====================================================================== Mongodb connected

const regexUser = /^[a-zA-Z0-9]{6,12}$/;
const regexPassword = /^.{6,}$/;

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

  const userSchema = new mongoose.Schema({
    user: String,
    password: String,
  });

  _userModel = mongoose.model("login", userSchema);
  return _userModel;
};

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Username validation
  const validUsername = regexUser.test(username);
  //password validation
  const validPassword = regexPassword.test(password);

  let error = false;
  if (!validUsername)
    error = "username to contain alphanumeric with length 6-12";
  else if (!validPassword) error = "password must be 6 chars or more";

  if (error)
    return res
      .status(400)
      .json({ error, status: false, message: "Invalid Entry" });
  // Checking if user exists

  const User = getUserModel();
  const userExists = await User.findOne({ user: username });

  let message = false,
    data = false;

  if (userExists) {
    if (userExists.password == password) {
      message = "logged in";
      data = userExists;
      console.log(`logged in! Welcome ${username}`);
      //return res.status(200).json({ status:true , message: 'Logged In' });
    } else message = "incorrect credentials";
  } else message = "no such user exists";

  return res.status(200).json({ error, status: !!data, data, message });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));


