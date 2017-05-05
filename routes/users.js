'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const Users = function() { return pg('users') };
const linkQuery = require('../db/link-queries')

function authorizedUser(req, res, next) {
  let userId = req.signedCookies.userID
  if (userId) {
    next()
  } else {
    req.flash('error', 'You are not authorized.')
    res.redirect(401, '/')
  }
}

router.get('/', authorizedUser, (req, res, next) => {
  Users().then((users) => {
    if (users) {
      res.json(users)
    } else {
      res.status(200).json({ message: 'User does not exist.' })
    }
  })
})

router.get('/signup', function(req, res, next){
  res.render('signup');
});

router.get('/:id', authorizedUser, function(req, res, next){
  Users().where('id', req.params.id).first().then(function(user){
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: 'User does not exist.' });
    }
  });
});

router.get('/login/:id', function(req, res, next){
  var userId = req.params.id
  res.redirect('/dashboard/' + userId);
});

router.get('/:id', authorizedUser, (req, res, next) => {
  linkQuery.getActiveBetsByUserId(req.params.id)
  .then((user) => {
    if (user) {
      res.json(user)
    } else {
      res.status(401).json({ message: 'User does not exist.' })
    }
  })
})

router.post('/newBet', function(req, res, next) {
    let userId = req.signedCookies.userID;
    console.log(userId);
    Users().select().where('id', userId).first()
    .then(function(user) {
        if (user) {
          console.log(user);
          console.log(req.body);
          linkQuery.addBet(req.body.title, req.body.terms, req.body.consequences, req.body.bet_start_date, req.body.bet_end_date)
          .then(function(bet) {
            console.log(bet);
            // linkQuery.addUsersBetJoin(user, bet)
            // then add bet to dashboard page
            req.flash('info', 'Thanks for adding a new bet.');
            res.redirect('/dashboard/' + userId);
          });
        } else {
          res.render('index', {error: "You already have an account with us. Please use the 'Log In' link."});
        }
    });
});

module.exports = router;
