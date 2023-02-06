const User = require('../models/User');

const signup_get = (req, res) => {
  res.render('signup');
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    console.log(user);
  } catch (err) { 
    console.log(err);
  }

  res.send('signup post');
};

const login_get = (req, res) => {
  res.render('login');
};

const login_post = (req, res) => {
  res.send('login post');
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
