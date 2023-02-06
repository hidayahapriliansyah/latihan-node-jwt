const User = require('../models/User');

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.message;
    });
  }

  return errors;
};

const signup_get = (req, res) => {
  res.render('signup');
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    console.log(user);
  } catch (err) { 
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_get = (req, res) => {
  res.render('login');
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login({ email, password });
    console.log(user, 'success');
  } catch (err) {
    console.log(err);
  }

  res.send('login post');
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
