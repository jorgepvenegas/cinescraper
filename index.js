var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');

var app = express();

app.get('/theatres', function(req, res) {
  var url = 'http://www.cinemark.cl/theatres/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var theaterList = [];
      var theaterData, theater = {};

      $('.theater-list li').each(function(e) {
        theaterData = $(this).find('.theater-list-detail');
        theater.title = theaterData.find('.title').text().trim();
        theater.address = theaterData.find('.address').eq(0).text().trim();
        theater.phone = theaterData.find('.phone').eq(0).text().trim();

        theaterList.push(theater);
        theater = {};
      });
    }

    fs.writeFile('theatres.json', JSON.stringify(theaterList, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the theatres.json file.');
    });

    res.send('Check your console!');

  }) ;
});

app.listen('8181');

console.log('Working on 8181');

exports = module.exports = app;
