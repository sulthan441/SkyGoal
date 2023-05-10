const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/User');

async function signup(req, res) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).send({ message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  const token = jwtUtils.generateToken(user.id);
  res.status(201).send({ token });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  const token = jwtUtils.generateToken(user.id);
  res.send({ token });
}

async function getUserDetails(req, res) {
  const user = await User.findById(req.userId).select('-password');
  res.send({ user });
}

module.exports = {
    signup,
    login,
    getUserDetails
  };