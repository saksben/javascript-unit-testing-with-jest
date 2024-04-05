var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require("nunjucks")

var indexRouter = require('./routes/index');
var basketRouter = require('./routes/basket');
var detailsRouter = require('./routes/details');

var app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/basket/', basketRouter);
app.use('/details/', detailsRouter);

module.exports = app;
