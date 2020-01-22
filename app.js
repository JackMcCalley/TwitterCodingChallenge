const http = require('http');
const hostname = 'localhost';
const port = 3000;
const fetch = require("node-fetch");
var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);
var tweetCount = 1;

var params = {
  q: '#coding',
  count: tweetCount,
  result_type: 'recent',
  lang: 'en'
}

// T.get('search/tweets', params, function(err, tweets, response) {
//   if(!err){
//     console.log(tweets)
//   } else {
//     console.log(err);
//   }
// })

var stream = T.stream('statuses/filter', {track: '#coding'});
stream.on('data', function(event) {
  console.log(event && event.text);
})

stream.on('error', function(error) {
  throw error;
});

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Twitter API Test');
  });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});