var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var underscore = require('underscore');
var mysql = require('./database/mysql');  //mysql 선언부, 상대경로로 선언된 부분

var login = require=('./user/login.js');
var join = require=('./user/join.js');

app.post('/user/login', login.login);
app.post('/user/join', join.join);

app.listen(3000, function() {
  console.log('Connection 3000 port!');
})
