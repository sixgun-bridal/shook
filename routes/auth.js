'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const Users = function() { return pg('user') };

router.post('/', function(req, res, next) {
    console.log(req.body);
    Users().where({
        email: req.body.email
    }).first().then(function(user) {
        console.log(user);
        if (!user) {
            let hash = bcrypt.hashSync(req.body.password, 10);
            return pg('user').insert({
                email: req.body.email,
                password: hash,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                avatar: req.body.avatar
              }).then(function(newUser){
              console.log(newUser);
              let userId = newUser.id
              console.log(userId);
              req.flash('info', 'Thanks for signing up.');
              res.redirect('/profile' + {userId});
            });
        } else {
            req.flash('error', 'You already have an account with us.');
            res.redirect('/users/login');
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
