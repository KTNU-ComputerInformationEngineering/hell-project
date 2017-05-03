var mysql = require("./database/mysql");
var underscore = require("underscore");
var md5 = require("md5");   //md5 암호화 알고리즘(비밀번호 암호화 시 사용)

exprots.login=function(req, res) {
  var conn;
  mysql.getConnection().then(function(connection){
    conn = connection;
    var hnum = req.body.hnum;

    var sql = 'select nickname, hnum, password from register where hnum = ?';
    var params=[hnum];

    var queryResult = conn.query(sql, params);

    return queryResult;
  }).then(function(result){

    if(result.length==0) {
      res.send({message:"id가 없습니다"});   //db와 대조하여 일치하는 id가 없을 시
    } else {
      var encrypt= md5(req.body.pwd);     //클라이언트단에서 전송된 패스워드 암호화
      var compare_pwd = encrypt.substr(0, 20);
      if(compare_pwd! = reusult[0].password) {
        res.send({message:"패스워드가 일치하지 않습니다"});
      } else {
        res.send({nickname:result[0].nickname, hnum:result[0].hnum, messgae:"로그인 성공"});
      }
    }

  }).catch(cuntion(Exception) {
    console.log("아이디 없음");
  }).finally(function() {
    conn.connection.release();
  })
}
