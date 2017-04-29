var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var underscore = require('underscore');
var promiseMysql = require('promise-mysql');  //mysql 선언부

app.listen(3000, function() {
  console.log('Connection 3000 port!');
})
