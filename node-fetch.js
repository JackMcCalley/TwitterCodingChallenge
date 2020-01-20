const fetch = require("node-fetch");
const url = " https://api.twitter.com/1.1/search/tweets.json?q=%23coding&result_type=recent";
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