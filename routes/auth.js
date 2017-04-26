'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const Users = function() { return pg('users') };

router.post('/', function(req, res, next) {
    Users().where({
        email: req.body.email
    }).first().then(function(user) {
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
              req.flash('profile', 'Thanks for signing up.');
            });
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
        console.log(bcrypt.compareSync(req.body.password, user.password));
        if ( user && bcrypt.compareSync(req.body.password, user.password) ) {
            res.cookie('userID', user.id, {
                signed: true
            });
            var userId = user.id
            req.flash('profile', 'Welcome back!');
            res.redirect('/profile/' + userId);
        } else {
            res.render('index', {error: 'Invalid email or password.'});
        }
    });
});

router.get('/logout', function(req, res) {
    res.clearCookie('userID');
    req.flash('profile', 'Goodbye!');
    res.render('index');
});

module.exports = router;
