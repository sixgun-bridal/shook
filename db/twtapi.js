const express = require('express');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.Hwf6tV4HoDdNk4ZHAOI6YWrdA,
    consumer_secret: process.env.tQDdXIdquwLq84u3ABZsHdOvs9pZ8YiqWWGn9EQKzKDYFOFwIc,
    access_token_key: "855889603139653633-5WTGg6sVYriZq8pEhclqLl8F0BLsz13",
    access_token_secret: "4IYoIxPVvD6aYnGq3cyZxQqLlqwVBXRkWbDsPwOdvwDOC"
});

require('dotenv').load();

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

// module.exports = twit;
