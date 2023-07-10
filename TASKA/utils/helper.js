// SANITIZATION
const regexUser = /^[a-zA-Z0-9]{6,12}$/;
const regexPassword = /^.{6,}$/;

module.exports = {
  regexUser,
  regexPassword,
};
