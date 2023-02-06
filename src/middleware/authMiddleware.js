const jwt = require('jsonwebtoken');
const User = require('../models/User');

// requireAuth used to protect route
const requireAuth = (req, res, next) => {
  const token = req.cookies.smoothies_token;

  if (token) {
    try {
      jwt.verify(token, process.env.SECRET_JWT);
      next();
    } catch (err) {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
};

// checkUser to check is user login, if yes it will return user.id if not it will return null
const checkUser = async (req, res, next) => {
  const token = req.cookies.smoothies_token;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
      const user = await User.findOne(decodedToken.id);
      res.locals.user = user;
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
};

module.exports = { requireAuth, checkUser };
