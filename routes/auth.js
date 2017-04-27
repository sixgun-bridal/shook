'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const Users = function() { return pg('users') };
const linkQuery = require('../db/link-queries')

router.post('/', function(req, res, next) {
    Users().where({
        email: req.body.email
    }).first().then(function(user) {
      if(!user){
        let avatar = req.body.avatar;
        if(!avatar) {
          avatar = 'http://www.freeiconspng.com/uploads/grab-vector-graphic-person-icon--imagebasket-13.png'
        }
        bcrypt.hash(req.body.password, 10)
        .then(function(hash){
          pg('users').insert({
                  email: req.body.email,
                  password: hash,
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  username: req.body.username
          }).then(function(){
            Users().where({
                email: req.body.email
            }).first().then(function(user){
              console.log(user);
              let userId = user.id
              console.log(userId);
              res.redirect('/profile/' + userId);
              req.flash('profile', 'Thanks for signing up.');
            })
          })
        })
      } else {
            res.render('index', {error: "You already have an account with us. Please use the 'Log In' link."});
        }
    });
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    Users().where({
        email: req.body.email,
    }).first().then(function(user) {
        console.log(user);
        console.log(req.body.password);
        console.log(user && bcrypt.compareSync(req.body.password, user.password));
        if(user){
          let userId = user.id
          bcrypt.compare(req.body.password, user.password)
          .then(function(data){
            console.log(data);
            if (data) {
              res.cookie('userID', user.id, {
                  signed: true
                });
                req.flash('profile', 'Welcome back!');
                res.redirect('/profile/' + userId);
            }
          })
        }
        else {
            res.render('index', {error: 'Invalid email or password.'});
        }
    });
});

router.get('/logout', function(req, res) {
  let userId = req.signedCookies.userID;
  res.clearCookie(userId);
  req.flash('index', 'Goodbye!');
  res.redirect('/');
});

module.exports = router;
