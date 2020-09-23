var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const chalk = require('chalk');
const config = require('./config/config');

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const env = require('./env/environment');

//const mongoUri = `mongodb://${env.cosmosdbName}:${env.key}@${env.cosmosdbName}.documents.azure.com:${env.port}/${env.db}?ssl=true&sslverifycertificate=false`;
const mongoUri ="mongodb+srv://kade:Marine7815@cluster0-p6xiv.mongodb.net/employees?retryWrites=true&w=majority";
const SERVER_PORT = 80;




const DB_NAME = 'product';
const DB_HOST = process.env.MONGODB_CONNECTION || 'mongo:27017';

// use this db connection for docker and k8s
//const mongoUri = `mongodb://${DB_HOST}/${DB_NAME}`;

// use this on local 
// const mongoUri = `mongodb://localhost:127.0.0.1/${DB_NAME}`;

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true}, function (err){
  if (err){
    console.error(chalk.red('Could not connect to MongoDB'));
    console.log(chalk.red(err));
    mongoose.connection.close();
    process.exit(-1);
  } else {
    console.log('Connected to MongoDB');
  }
});    

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
