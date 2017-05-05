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

router.get('/:id', authorizedUser, function(req, res, next){
  Users().where('id', req.params.id).first().then(function(user){
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: 'User does not exist.' });
    }
  });
});

module.exports = router;
