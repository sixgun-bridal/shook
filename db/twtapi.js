//npm install twitter-stream-api


var TwitterStream = require('twitter-stream-api'),
    fs = require('fs');

var client = new Twitter({
    consumer_key: process.env."Hwf6tV4HoDdNk4ZHAOI6YWrdA",
    consumer_secret: process.env."tQDdXIdquwLq84u3ABZsHdOvs9pZ8YiqWWGn9EQKzKDYFOFwIc",
    access_token_key: process.env."855889603139653633-5WTGg6sVYriZq8pEhclqLl8F0BLsz13",
    access_token_secret: process.env."4IYoIxPVvD6aYnGq3cyZxQqLlqwVBXRkWbDsPwOdvwDOC"
});


var Twitter = new TwitterStream(client, false);
Twitter.stream('statuses/filter', {
    track: 'javascript'
});

Twitter.pipe(fs.createWriteStream('tweets.json'));


module.exports = twit;
