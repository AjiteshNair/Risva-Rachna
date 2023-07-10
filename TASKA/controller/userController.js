const { login } = require("../provider/userProvider.js");
const { regexUser, regexPassword } = require("../utils/helper.js");

const validateToken = (req, res, next) => { //to add jwt
  next();
};

const validateUser = (req, res, next) => {
  const { username, password } = req.body;
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
  next();
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const input = {
    username,
    password,
  };
  return await login(input, res);
};

module.exports = (app) => {
  app.post("/login", validateToken, validateUser, userLogin);
};
