const dotenv = require('dotenv');
dotenv.config();
var express = require('express');
const port = process.env.PORT;
var Twitter = require('twitter');
var config = require('./config.js');

var app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

var client = new Twitter(config);
var tweetCount = 250;
var params = {
  q: "#coding",
  count: tweetCount,
  result_type: 'recent',
  lang: 'en'
}

var codeTweets = []

client.get('search/tweets', params, function(error, tweets, callback){
  if (!error) {
    statuses = tweets.statuses

    var codeTweet;
    
    for (i = 0; i < statuses.length; i++){
      codeTweet = {name: statuses[i].user.name, username: statuses[i].user.screen_name, 
        text: statuses[i].text, created: statuses[i].created_at, 
        link: "https://twitter.com/" + statuses[i].user.screen_name + "/status/" + statuses[i].id_str}
      codeTweets.push(codeTweet);
    }
  }
  return codeTweets
});

var searchForm = function(){
  var numberForm = '<form action="/search_tweets" method="post">' + 
  '<label for="search_field">Search Tweets: </label><input id="search" ' + 
  'type="text" name="search_field" value="#coding"> ' + 
  '<label for="tweetNum">Number of Tweets: </label><input id="tweetNum" ' + 
  'type="number" name="tweet_number" min="1" max="2500 value="250"> ' +
  '<input type="submit" value="OK">' + 
  '</form>'
  return numberForm;
}

var parseTweets = function(tweets){
  var parsedTweets = ''
  for(i=0; i<tweets.length; i++){
    parsedTweets += "<p>Tweet #" + (i + 1) +": </p>" + "<p>Username: " + tweets[i].username + "</p>" +
      tweets[i].text + "<p>Date Sent: " + tweets[i].created + "</p><p><a href=https://twitter.com/" 
      + statuses[i].user.screen_name + "/status/" + statuses[i].id_str + ">Link to Tweet</a></p>\n"
  }
  return parsedTweets
}

app.get('/', function(request, response){
  response.send(
    '<html><body><meta charset="utf-8"/>' + 
    '<p>' + searchForm() + '</p><p>' + parseTweets(codeTweets) + 
    '</p>' + '</body></html>'
    )
})

app.post('/search_tweets', function(request, response){
  search = request.body.search_field
  tweetCount = request.body.tweet_number
  params = {
    q: search,
    count: tweetCount,
    result_type: 'recent',
    lang: 'en'
  }
  response.send(
    '<html><body><meta charset="utf-8"/><p>' + searchForm() + 
    '</p><p>' + parseTweets(codeTweets) + '</p>' + '</body></html>'
    )
})

app.listen(port,function(){
  console.log('listening on : ' + port);
});