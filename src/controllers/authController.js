const User = require('../models/User');

const handleErrors = (err) => {
  let errors = { email: '', password: '' };
  
  if (err.message === 'This email is not registered') {
    errors.email = err.message;
    return errors;
  }

  if (err.message = 'Password is incorrect') {
    errors.password = err.message;
    return errors;
  }


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
    res.status(201).json({user: user._id});
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
    res.status(200).json({user: user._id});
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
