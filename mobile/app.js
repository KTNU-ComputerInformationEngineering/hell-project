var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var underscore = require('underscore');
var mysql = require('./database/mysql');  //mysql 선언부, 상대경로로 선언된 부분

app.listen(3000, function() {
  console.log('Connection 3000 port!');
})
