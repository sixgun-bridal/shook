'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const Users = function() { return pg('users') };

router.post('/', function(req, res, next) {
    console.log(req.body);
    Users().where({
        email: req.body.email
    }).first().then(function(user) {
        console.log(user);
        if (!user) {
            let avatar = req.body.avatar;
            if(!avatar) {
              avatar = 'http://www.freeiconspng.com/uploads/grab-vector-graphic-person-icon--imagebasket-13.png'
            }
            let hash = bcrypt.hashSync(req.body.password, 10);
            pg('users').insert({
                email: req.body.email,
                password: hash,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                avatar: avatar
              }).then(function() {
                return pg('users').select().where('email', '=', req.body.email)
              }).then(function(newUser){
              console.log(newUser);
              var userId = newUser[0].id
              console.log(userId);
              res.redirect('/profile/' + userId);
              req.flash('info', 'Thanks for signing up.');
            });
        } else {
            return pg('users').select().where('email', '=', req.body.email)
            .then(function(existingUser){
              console.log(existingUser);
              var userId = existingUser[0].id
              console.log(userId);
            res.redirect('/users/login/' + userId);
            req.flash('error', 'You already have an account with us.');
          });
        }
    });
});

router.post('/login', function(req, res, next) {
    Users().where({
        email: req.body.email,
    }).first().then(function(user) {
        if ( user && bcrypt.compareSync(req.body.password, user.password) ) {
            res.cookie('userID', user.id, {
                signed: true
            });
            req.flash('info', 'Welcome back!');
            res.redirect('/');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/users/login');
        }
    });
});

router.get('/logout', function(req, res) {
    res.clearCookie('userID');
    req.flash('info', 'Goodbye!');
    res.redirect('/');
});

module.exports = router;
