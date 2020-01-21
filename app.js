const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const fetch = require("node-fetch");

const authUrl = "https://api.twitter.com/oauth/authenticate?oauth_token=206055597-JZvayjpUfCgyMdSz3ijCLKa11BeNrf3yyjrWQv4H"
const auth = async authUrl => {
    try {
        const response = await fetch(auth);
        const json = await response.json();
        console.log(json);
    } catch(error) {
        console.log(error);
    }
}
auth(authUrl);
const url = "https://api.twitter.com/1.1/search/tweets.json?q=%23coding&result_type=recent";
const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
getData(url);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Twitter API Test');
  });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});