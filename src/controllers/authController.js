const signup_get = (req, res) => {
  res.send('signup get');
};

const signup_post = (req, res) => {
  res.send('signup post');
};

const login_get = (req, res) => {
  res.send('login get');
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
