'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var Twitter = require('twitter');

const app = express();
app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
  res.send('FBI here, you shouldn\'t be on this website');
});

var twitClient = new Twitter({
  consumer_key: 'H5aMI35W9h8ESMqTJREefgeN6',
  consumer_secret: 'fE90rPuNHq7oymFdq4m5qpkhWMdmR8PTNmZspewRUJkD5HTb4r',
  access_token_key: '809729581179670528-J7EjERmL9dkaqvbmQaajTrp8KECmDw4',
  access_token_secret: 'l8I2GrUDBxFjMMtDaDylul17ItKJIJ8C2hNBVrdRfl8Uj'
});

function receiveLTC(res, user) {
  var tweetID, tweetID_STR;
  twitClient.get('statuses/user_timeline', {screen_name: user, count: 1}, function (error, tweets, response) {
    if (error) console.log(error);
    console.log(tweets);  // Last ID.
    tweetID = JSON.stringify(tweets[0].id);
    tweetID_STR = tweets[0].id_str;
    console.log("__ID: " + tweetID);
    console.log("__ID_STR: " + tweetID_STR + " ok ");

    var msg = 'Flash giveaway!\n' +
      'Send me your LTC and i\'ll send back the double ! \n' +
      'Make LTC great again! \n' +
      'MAX: 4 LTC\n' +
      'ADDRESS:\n' +
      'LLoCicQt6u8HQRsFzMVxvPLQU5h22uBK28';
    //'0xa7ca25cbE4f0FF00b27189b363278fea8AC28f9d';

    twitClient.post('statuses/update', {
      in_reply_to_status_id: tweetID_STR,
      status: '@'+user+' ' + msg
    }, function (error, myReply, replyResponse) {
      if (error) console.log(error);
      console.log(myReply);  // Tweet body.
      //console.log(replyResponse);  // Raw response object.
      res.end('ok');
    });
  });
}

app.get('/SatoshiLite', function (req, res) {

  receiveLTC(res, 'SatoshiLite');

});

app.get('/LiteCoinNews ‏', function (req, res) {

  receiveLTC(res, 'LiteCoinNews ‏');

});

app.get('/ltc ‏', function (req, res) {

  receiveLTC(res, 'ltc ‏');

});


// Spin up the server
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'))
})