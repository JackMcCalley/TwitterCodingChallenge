const http = require('http');
const dotenv = require('dotenv');
dotenv.config();
var fs = require('fs');
const port = process.env.PORT;
var Twitter = require('twitter');
var config = require('./config.js');

var client = new Twitter(config);
var tweetCount = 5;
var search = '#coding'

var params = {
  q: search,
  count: tweetCount,
  result_type: 'recent',
  lang: 'en'
}

client.get('search/tweets', params, function(error, tweets, callback){
  if (!error) {
    statuses = tweets.statuses

    var codeTweets = []
    var codeTweet;
    
    for (i = 0; i < statuses.length; i++){
      codeTweet = {name: statuses[i].user.name, username: statuses[i].user.screen_name, 
        text: statuses[i].text, created: statuses[i].created_at, 
        link: "https://twitter.com/" + statuses[i].user.screen_name + "/status/" + statuses[i].id_str}
      codeTweets.push(codeTweet);
    }
  }

  for(i=0; i< codeTweets.length; i++){
    console.log(JSON.stringify(codeTweets[i]))
  }
  return codeTweets;
});

http.createServer((req, res) => {
  fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
      res.write(data);
      res.end();
  });
}).listen(port);