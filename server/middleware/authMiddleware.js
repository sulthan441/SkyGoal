const jwtUtils = require('../utils/jwtUtils');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    const decoded = jwtUtils.verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).send({ message: 'Invalid token' });
  }
}

module.exports = {
  verifyToken
};
