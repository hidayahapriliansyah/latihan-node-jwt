const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };