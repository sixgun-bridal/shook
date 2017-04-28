'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const Users = function() { return pg('users') };
const linkQuery = require('../db/link-queries')

router.post('/tweet', (req, res, next) => {
  let username = req.body.username
  return pg('users').select().where('username', '=', username)
  .then(function(data) {
      console.log(data);
      let userId = data.id
      console.log(userId);
      res.redirect('/profile/' + userId)
  })
})

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  Users().select().where('id', id).first()
  .then(function(user) {
    linkQuery.getActiveBetsByUserId(id)
    .then(function(bets){
      res.status(200).render('profile', {bets, user});
    })
  })
})

router.post('/edit', (req, res, next) => {
  let userId = req.signedCookies.userID;
  linkQuery.editProfile(userId, req.body)
  .then(function(){
    res.redirect('/profile/' + userId)
  })
})

module.exports = router;
