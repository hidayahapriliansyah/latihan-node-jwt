const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.listen(3000);

// middleware

// connect to db

// view engine

// routes
app.use(authRoutes);

app.get('/', (req, res) => {
  res.send('test');
});