var express = require('express');
var app = express();
var ejs = require('ejs');


app.set('views', './view');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var mysql = require('mysql');
var conn = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '111111',
 database: 'fooding'

});


conn.connect();


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var client_id = 'DkzkX31ZFQb5VCAJ1WGj';
var client_secret = 'OfM9lWlblV';
app.get('/geocode', function (req, res) {
   //var api_url = 'https://openapi.naver.com/v1/map/geocode?query=' + encodeURI(req.query.query); // json
   var api_url = 'https://openapi.naver.com/v1/map/geocode.xml?query=' + encodeURI(req.query.query); // xml
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });




 app.get('/map', function(req, res){

   res.render('navermap.html');
 });

 app.get('/searchmap', function(req, res){
   var resname = req.query.resname;
   var sql = 'SELECT * FROM restaurant WHERE name=?';

   conn.query(sql, [resname], function(err, topic, fields){
     if(err)
     {
       console.log(err);
       res.status(500).send('internal server error');
     }else {
       res.render('navermap.html', {topic:topic[0]});
     }

   });
 });

 app.get('/search', function(req, res){
   var sql = 'SELECT * FROM restaurant'

   conn.query(sql, function(err, sikdangs, fields){
     if(err)
     {
       console.log(err);
       res.status(500).send('internal server error');
     }else
       {
        res.render('search.html', {sikdangs:sikdangs});
       }

   });


 });

app.post('/search', function(req, res){
  var name = req.body.title;


  var sql = 'select name, address, tel, rate, x, y from restaurant where name=?';

  conn.query(sql, [name],function(err, topic, fields){

    if(err)
    {
      res.send('internal server err');
    }else {
      {
        res.render('navermap.html', {topic: topic[0]});
      }
    }
  });


});



 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/geocode?query=주소 app listening on port 3000!');
 });
