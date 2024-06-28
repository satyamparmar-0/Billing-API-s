var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const DataToConnect = require('./connection')
const bodyParser = require("body-parser");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user.auth');
var categoryRoutes = require('./routes/category');
var subcategoryRoutes = require('./routes/subCategory');
var productsRoutes = require('./routes/product');
var orderRoutes = require('./routes/orders');
var paymentRoutes = require('./routes/payments');
var contactUsRoutes = require('./routes/contactus');
var invoiceRoutes = require('./routes/invoice');
var userTableRoutes = require('./routes/table.routes.user');
var ownerRoutes = require('./routes/table.routes.owner');
require('dotenv').config();
const {restrictToUserLoginOnly} = require('./middlewares/auth')
const cors = require('cors');
const fileupload = require('express-fileupload')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(fileupload({
  useTempFiles:true
}));
DataToConnect();

app.use('/users',restrictToUserLoginOnly,indexRouter);
app.use('/api', usersRouter);
app.use('/api',categoryRoutes);
app.use('/api',subcategoryRoutes);
app.use('/api',productsRoutes);
app.use('/api',orderRoutes);
app.use('/api',paymentRoutes);
app.use('/api',contactUsRoutes);
app.use('/api',invoiceRoutes);
app.use('/api',userTableRoutes);
app.use('/api',ownerRoutes);
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

module.exports = app;