const User = require('../models/User');

async function getProfile(req, res) {
  const user = await User.findById(req.userId).select('-password');
  res.send({ user });
}

module.exports = {
  getProfile
};
