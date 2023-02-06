const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cookieParser());

// connect to db
const dbURI = `mongodb+srv://${process.env.MONGOOSE_ATLAS_USERNAME}:${process.env.MONGOOSE_ATLAS_PASSWORD}@latihan-node-auth.dvncngo.mongodb.net/latihan-node-auth`;
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// view engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// routes
app.get('*', checkUser);
app.use(authRoutes);
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/smoothies', requireAuth, (req, res) => {
  res.render('smoothies');
});
