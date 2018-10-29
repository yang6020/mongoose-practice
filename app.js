const express = require('express');
const logger = require('morgan');
const app = express();
const users = require('./routes/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(
  'mongodb://localhost/car-practice',
  { useNewUrlParser: true },
);
app.use(bodyParser.json());

app.use(logger('dev'));

app.use('/users', users);

// Catch 404s
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

app.set('port', 3001);

const port = app.get('port') || 3000;
app.listen(port, () => {
  console.log('listening at port ' + port);
});
