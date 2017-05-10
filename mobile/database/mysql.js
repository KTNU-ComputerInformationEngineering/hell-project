/*
db와 서버를 연결하는 데이터베이스 연결
해당 js 파일을 이용해서 모바일 및 웹 서버를 db와 연동함
mysql 을 사용하지 않고 promise-mysql 을 사용
*/
var mysql = require('promise-mysql');
var getConnection = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : 'wmf0203',
  database : 'foodingdb'
});

module.exports = getConnection;
