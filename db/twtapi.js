const express = require('express');
var Twitter = require('twitter');
const _ = require('lodash')

const router = express.Router();
const pg = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const Users = function() { return pg('users') };
const linkQuery = require('../db/link-queries')


// const params = {screen_name: 'shookbot'};

var client = new Twitter({
    consumer_key: "Hwf6tV4HoDdNk4ZHAOI6YWrdA",
    consumer_secret: "tQDdXIdquwLq84u3ABZsHdOvs9pZ8YiqWWGn9EQKzKDYFOFwIc",
    access_token_key: "855889603139653633-5WTGg6sVYriZq8pEhclqLl8F0BLsz13",
    access_token_secret: "4IYoIxPVvD6aYnGq3cyZxQqLlqwVBXRkWbDsPwOdvwDOC"
});

const isTweet = _.conforms({
  contributors: _.isObject,
  id_str: _.isString,
  text: _.isString,
})

// //REST API
// var params = {screen_name: 'shookbot'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });
//
// client.post('statuses/update', {status: 'I Love Twitter'})
//   .then(function (tweet) {
//     console.log(tweet);
//   })
//   .catch(function (error) {
//     throw error;
//   })


//Streaming API
var stream = client.stream('statuses/filter', {track: '#shook'});
stream.on('data', function(event) {
  console.log(event && event.text);
});

// stream.on('error', function(error) {
//   throw error;
// });

// //Callback Streaming API
// client.stream('statuses/filter', {track: '#shook'}, function(stream) {
//   stream.on('data', function(event) {
//     console.log(event && event.text);
//   });
//
//   stream.on('error', function(error) {
//     throw error;
//   });
// });
//
// // STREAM all tweets about 'bets' (search and stream very similar but search has more powerful queries and wider range of data whereas streams return a much higher flow of tweets)
// client.stream('statuses/filter', {track: 'bets'}, function(stream) {
//   stream.on('data', function(event) {
//     console.log(event && event.text);
//   });
//
//   stream.on('error', function(error) {
//     throw error;
//   });
// });
//
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

// client.get(path, params, callback);
// client.post(path, params, callback);
// client.stream(path, params, callback);
//
// // SEARCH for tweets about 'bets'
// client.get('search/tweets', {q: '#shook', '@shookbot'}, function(error, tweets, response) {
//    console.log(tweets);
//    .then(function(tweets){
//
//    })
// });

// TWEET a new status
// client.post('statuses/update', {status: 'I love holding people accountable for past bets'},  function(error, tweet, response) {
//   if(error) throw error;
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });

//
// setInterval(function() {
//   searchAndTweet(console.log, console.log);
// }, 5 * 60 * 1000);


// _ = require('lodash')
// const isTweet = _.conforms({
//   contributors: _.isObject,
//   id_str: _.isString,
//   text: _.isString,
// })

// module.exports = router;
