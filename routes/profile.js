'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const Users = function() { return pg('users') };
const linkQuery = require('../db/link-queries')


// router.get('/', function(req, res, next) {
//     let user_id = req.signedCookies.userID;
//
//     if (user_id) {
//         Users().select().where({
//             id: user_id
//         }).then(function(user) {
//             res.status(200).render('loggedin', {
//                 email: user[0].email
//             });
//         });
//     } else {
//         res.status(200).render('index');
//     }
// });

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  Users().select().where('id', '=', id)
  .then(function(data) {
    res.status(200).render('profile', {data});
  })
})

module.exports = router;
