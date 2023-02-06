const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
const static = app.use(express.static(`${__dirname}/public`));

// connect to db
const dbURI = `mongodb+srv://${process.env.MONGOOSE_ATLAS_USERNAME}:${process.env.MONGOOSE_ATLAS_PASSWORD}@latihan-node-auth.dvncngo.mongodb.net/latihan-node-auth`;
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// view engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// routes
app.use(authRoutes);

app.get('/', (req, res) => {
  res.render('home');
});