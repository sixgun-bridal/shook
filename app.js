'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const pg = require('./db/knex');
const session = require('express-session');
const Users = function() { return pg('users') };

const port = process.env.PORT || 3000;

// routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const profile = require('./routes/profile')

// app
const app = express();
require('dotenv').load();
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser(process.env.SECRET));
app.use(express.static(path.join(__dirname, 'public')));

// flash message middleware
app.use(session({
    secret: process.env.SECRET,
    name: 'SIMPLEAPP__',
    resave: true,
    saveUninitialized: true
}));
app.use(require('flash')());
app.use(function(req, res, next) {
    res.clearCookie('SIMPLEAPP__');
    next();
});

// main route
app.get('/', (req, res, next) => {
  res.status(200).render('index')
})

app.use('/auth', auth);
app.use('/users', users);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

module.exports = app;
