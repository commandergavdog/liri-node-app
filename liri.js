//secret key stash
require('dotenv').config()
//requiring packages
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");
//hold terminal input if defined
var firstInstruction  = process.argv[2];
var secondInstruction  = process.argv[3];
//Spotify/Twitter keys
var spotify = new Spotify(keys.spotify); 
var client = new Twitter(keys.twitter);
//switch statements for given commands
switch (firstInstruction){
    case 'spotify-this-song':
        song();
        break;
    case 'my-tweets': 
        myTweets(); 
        break;
    case 'movie-this':
        movie();
        break;
    case 'do-what-it-says':
        doIt();
        break;
  default:
    console.log("You should tell me what to do! Your options are:  `my-tweets` `spotify-this-song` `movie-this` `do-what-it-says`");
};
//The Backstreet Boys are the greatest artists of the 20th AND 21st centuries, we are undeserving. 
function doIt () {
    fs.readFile("random.txt", "UTF8", function(err, data) {
      if (err) {return console.log("Error occurred: " + err);};
      var justin = data.split(",");
      firstInstruction = justin[0];
      secondInstruction = justin[1];
      switch (firstInstruction) {case 'spotify-this-song': song (); break;
  };});
};  
//use secondInstruction value to query and display info in the terminal 
function song(){
    if (!secondInstruction){secondInstruction = "Strawberry Fields Forever";};
  spotify.search({ type: 'track', query: secondInstruction, limit: 1}, function(err, data){
    if (err) {return console.log('Error occurred: ' + err);};
      console.log("Song Link: " + data.tracks.items[0].external_urls.spotify);
      console.log("Title: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("-------------");
    });
};
//display last 20 tweets in the terminal
function myTweets(){
  client.get('statuses/user_timeline', 20, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++){
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log("-------------");
    };};})
};
//use secondInstruction value to query and display info in the terminal 
function movie(){
    if (!secondInstruction) {secondInstruction = "Shrek 2"; };
  var queryUrl = "http://www.omdbapi.com/?t=" + secondInstruction + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
    var data = JSON.parse(body);
    if (!error && response.statusCode === 200) {
      console.log("Title: " + data.Title);
      console.log("Year: " + data.Year);
      console.log("IMDB Rating: " + data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
      console.log("Country: " + data.Country);
      console.log("Language: " + data.Language);
      console.log("Plot: " + data.Plot);
      console.log("Actors: " + data.Actors);
      console.log("-------------");
    };});
};

