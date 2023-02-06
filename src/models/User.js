const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [ true, 'Please insert the email' ],
    unique: true,
    lowercase: true,
    validate: [ isEmail, 'Please insert valid email' ],
  },
  password: {
    type: String,
    require: [ true, 'Please insert the password' ],
    minlength: [ 6, 'Password minimal length is 6' ],
  },
});

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function({ email, password }) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } 
    throw Error('Password is incorrect');
  } else {
    throw Error('This email is not registered');
  }
};

const User = mongoose.model('user', userSchema);

module.exports = User;
