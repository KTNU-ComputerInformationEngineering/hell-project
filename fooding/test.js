var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');




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


app.set('views', './view');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var client_id = 'DkzkX31ZFQb5VCAJ1WGj';
var client_secret = 'OfM9lWlblV';


app.get('/', function(req, res){

  res.render('main.html');
});

app.get('/imgs', function(req, res){
  fs.readFile('longlogo.png', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

app.get('/title', function(req, res){

  fs.readFile('testimg.jpg', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

app.get('/title2', function(req, res){

  fs.readFile('testimg2.jpg', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

app.post('/login', function(req, res){
  var id = req.body.id;
  var pwd= req.body.pw;
  var sql = 'SELECT id from register where id=?';

  conn.query(sql, [id], function(err, rows, fieldes){

    if(rows[0])
    {
      var sql = 'SELECT password from register where id=?';
      conn.query(sql, [id], function(err, rows, fields){
        if(rows[0].password==pwd){
          res.redirect('/');
        }else{
          res.send("아이디는 있지만 비밀번호가 불일치 합니다");
        }
      });
    }else{
      res.send("아이디가 존재하지 않습니다");
    }
  });

});

app.get('/register', function(req, res){

  res.render('register2.html');
});

app.get('/login', function(req, res){

  res.render('login.html');
});

app.post('/register', function(req, res){

 var gender = req.body.gender;
 var id = req.body.ID;
 var password = req.body.pwd;
 var password2 = req.body.pwd2;
 var name= req.body.Name;
 var nick=req.body.nick;
 var mail= req.body.email;
 var phone = req.body.phoneNumber;
 var receive= req.body.receive;
 var favorite=req.body.favorite;

 var sql = 'SELECT id from register where id = ?';

 conn.query(sql, [id], function(err, rows, fields){

   if(rows[0])
   {
     res.send('이미 아이디가 존재합니다 다른 아이디를 입력하세요');
     return;
   }
 });

 var sql1= 'SELECT nick from register where nick=?';

 conn.query(sql1, [nick], function(err, rows, fields){

   if(rows[0])
   {
     res.send("이미 닉네임이 존재합니다");
     return;
   }
 });

 var sql3 = 'INSERT INTO register(nick, id, gender, password, name, email, tel,\
  receive, favorite) VALUES (?,?,?,?,?,?,?,?,?)';



  conn.query(sql3, [nick, id, gender, password, name, mail,
  phone, receive, favorite], function(err, result, fields){

    if(err)
    {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }else {

      res.redirect('/');
    }
  });


});



app.get('/search', function(req, res){
  var sql = 'SELECT * FROM res'

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

app.get('/comment', function(req, res){
  res.render('comment.html');
});

app.post('/search', function(req, res){
 var name = req.body.title;


 var sql = 'select name, address, tel, x, y from res where name=?';

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

app.get('/map', function(req, res){

  res.render('navermap.html');
});

app.get('/searchmap', function(req, res){
  var resname = req.query.resname;
  var sql = 'SELECT * FROM res WHERE name=?';

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


var server = app.listen(3000, function(req, res){

  console.log("EXPRESS SERVER HAS STARTED ON PORT 3000")
});
