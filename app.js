import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import hbs from 'hbs';
import hbsutils from 'hbs-utils';

import indexRouter from './routes/index';

var app = express();

// view engine setup
hbsutils(hbs).registerPartials(`${__dirname}/views/partials`);
hbsutils(hbs).registerWatchedPartials(`${__dirname}/views/partials`);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets/jquery', express.static(`${__dirname}/node_modules/jquery/dist`));
app.use('/assets/bootstrap', express.static(`${__dirname}/node_modules/bootstrap/dist`));
app.use('/assets/font-awesome', express.static(`${__dirname}/node_modules/font-awesome`));
app.use('/assets/img', express.static(`${__dirname}/public/images`));
app.use('/assets/js', express.static(`${__dirname}/public/javascripts`));
app.use('/assets/css', express.static(`${__dirname}/public/stylesheets`));

app.use('/', indexRouter);

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