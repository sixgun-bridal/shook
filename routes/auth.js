'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const linkQuery = require('../db/link-queries')
const Users = function() { return pg('users') };

router.post('/signup', (req, res) => {
  linkQuery.getUserByEmail(req.body.email)
  .then((user) => {
    if(!user) {
      bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        pg('users').insert({
          email: req.body.email,
          password: hash,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username
        }).then(() => {
          Users().where({
              email: req.body.email
          }).first().then((user) => {
            let userId = user.id
            req.flash('info', 'Thanks for signing up.');
            res.redirect('/dashboard/' + userId)})
          })
        })
    } else {
      res.render('index', {error: "You already have an account with us. Please use the 'Log In' link."});
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({
      status: 'error',
      message: 'Something bad happened!'
    })
  })
});

router.post('/login', (req, res, next) => {
  linkQuery.getUserByEmail(req.body.email)
  .then((user) => {
    if(user){
      let userId = user.id
      bcrypt.compare(req.body.password, user.password)
      .then((data) => {
        if (data) {
          res.cookie('userID', user.id, {
              signed: true
            });
          req.flash('info', 'Welcome back!');
          res.redirect('/dashboard/' + userId);
        }
      })
    }
    else {
      res.render('index', {error: 'Invalid email or password.'});
    }
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('userID');
  req.flash('info', 'Goodbye!');
  res.redirect('/');
});

module.exports = router;
