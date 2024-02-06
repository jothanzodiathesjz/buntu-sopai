const User = require("../Models/UserModel");
const { createAccessToken } = require("../utils/jwt");
const Login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user.password != password) {
    res.status(401).json({ msg: "password salah!" });
    return;
  }
  const payload = {
    user: user._id,
    username: user.username,
  };
  const token = createAccessToken({ payload });
  res.status(200).json({ msg: "login sukses", token });
};
const CreateUser = async (req, res) => {
  const { username, password } = req.body;
  await User.create({ username, password });
  res.status(201).json({ msg: "sukses terdaftar!" });
};

module.exports = {
  CreateUser,
  Login,
};
