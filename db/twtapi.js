const express = require('express');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: "Hwf6tV4HoDdNk4ZHAOI6YWrdA",
    consumer_secret: "tQDdXIdquwLq84u3ABZsHdOvs9pZ8YiqWWGn9EQKzKDYFOFwIc",
    access_token_key: "855889603139653633-5WTGg6sVYriZq8pEhclqLl8F0BLsz13",
    access_token_secret: "4IYoIxPVvD6aYnGq3cyZxQqLlqwVBXRkWbDsPwOdvwDOC"
});

//REST API
var params = {screen_name: 'shook'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

client.post('statuses/update', {status: 'I Love Twitter'})
  .then(function (tweet) {
    console.log(tweet);
  })
  .catch(function (error) {
    throw error;
  })


//Streaming API
var stream = client.stream('statuses/filter', {track: '#shook'});
stream.on('data', function(event) {
  console.log(event && event.text);
});

stream.on('error', function(error) {
  throw error;
});

//Callback Streaming API
client.stream('statuses/filter', {track: '#shook'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event && event.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});


// _ = require('lodash')
// const isTweet = _.conforms({
//   contributors: _.isObject,
//   id_str: _.isString,
//   text: _.isString,
// })

// module.exports = twit;
