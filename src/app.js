const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.listen(3000);

// middleware
const static = app.use(express.static(`${__dirname}/public`));

// connect to db

// view engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// routes
app.use(authRoutes);

app.get('/', (req, res) => {
  res.render('home');
});