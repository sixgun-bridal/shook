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

// router.post('/tweet', (req, res, next) => {
//   let username = req.body.username
//   linkQuery.getUserByUsername(username)
//   .then((user) => {
//     let userId = user.id
//     res.redirect('/dashboard/' + userId)
//   })
// })

module.exports = router;
