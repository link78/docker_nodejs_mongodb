var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')

const DB_NAME = 'product';
const DB_HOST = process.env.DB_HOST || 'mongo:27017';

const SERVER_PORT = 8080;




// use this db connection for docker and k8s
mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, {useNewUrlParser: true});

// use this on local 
//mongoose.connect(`mongodb://localhost/${DB_NAME}`, {useNewUrlParser: true});

const app = express();

var employees = require('./routes/employees');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', employees);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(SERVER_PORT, () => {
  console.info("Server started on port %d...", SERVER_PORT);
});
