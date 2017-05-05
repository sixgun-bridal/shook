'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const linkQuery = require('../db/link-queries')

// get user dashboard after signing up or logging in
router.get('/:id', (req, res, next) => {
  let userId = req.params.id
  linkQuery.getUserById(userId)
  .then((user) => {
    console.log(user);
    linkQuery.getActiveBetsByUserId(userId)
    .then((bets) => {
      console.log(bets);
      res.status(200).render('dashboard', {bets, user});
    })
  })
})

// get user dashboard after already logged in
router.post('/edit', (req, res, next) => {
  let userId = req.signedCookies.userID;
  linkQuery.editProfile(userId, req.body)
  .then(() => {
    res.redirect('/dashboard/' + userId)
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

// router.post('/tweet', (req, res, next) => {
//   let username = req.body.username
//   linkQuery.getUserByUsername(username)
//   .then((user) => {
//     let userId = user.id
//     res.redirect('/dashboard/' + userId)
//   })
// })

module.exports = router;
