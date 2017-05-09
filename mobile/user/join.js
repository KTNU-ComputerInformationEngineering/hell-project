/*
  클라이언트 단에서 req를 받아 디비로 던져주고
  디비에서 쿼리문을 돌려 나온 결과를 바탕으로
  회원가입이 성공 했는지 실패 했는지 판별 및 자료 저장
*/
var mysql = require('./database/mysql');
var bodyParser = require('body-parser');

exports.join = function(req, res) {
  var conn;
  mysql.getConnection().then(function(connection){
    conn = connection;

    //회원가입시 디비로 날리는 insert 쿼리문
    var sql = 'insert into register(nickname, id, gender, password, name, email, tel, recive, favorite), value(?,?,?,md5(?),?,?,?,?,?)';
    //req로 넘어오는 사용자가 입력한 정보 저장(파라미터)
    var params = [req.body.nickname, req.body.id, req.body.gender, req.body.password, req.body.name, req.body.email, req.body.tel, req.body.recive, req.body.favorite];

    return conn.query(sql, params);

    //회원가입 성공 여부 판별
  }).then(function(result)){
    //회원가입 성공
    if(result.length == 1) {
      res.send({code:1, message:'회원가입에 성공하였습니다!'});
      //회원가입 실패
    } else {
      res.send({code:0, message:'회원가입 실패'});
    }
    //회원가입 실패
  }).catch(function() {
    res.send({code:0, message:'회원가입 실패'});
    //성공 후 동작
  }).finally(function() {
    conn.connection.release();
  });
}
