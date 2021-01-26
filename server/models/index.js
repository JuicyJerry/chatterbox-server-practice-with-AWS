var db = require("../db");

module.exports = {
  messages: {
    get: function(callback) {
      // fetch all messages
      // text, username, roomname, id
      var queryStr = `select messages.id, messages.text, messages.roomname, users.username
        from messages left outer join users on (messages.userid = users.id)
        order by messages.id desc`;
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    post: function(params, callback) {
      // create a message for a user id based on the given username
      //! 아래 쿼리의 뜻은 username으로 전달받은 이름이 users 테이블에 존재하지 않는경우 users 테이블에 해당 이름의 데이터를 생성하겠다는 의미!
      db.query(`INSERT INTO users (username) SELECT * FROM (select ? ) AS tmp WHERE NOT EXISTS (SELECT username FROM users WHERE username = ?) LIMIT
      1`,[params.username, params.username], (err,rows)=>{

        let queryStr = `insert into messages(text, userId, roomname) value (?, (select id from users where username = ? limit 1), ?)`;
        
        db.query(queryStr, [params.text, params.username,params.roomname], function(err, results) {
          callback(err, results);
        });
      })
    }
  },
  users: {
    get: function(callback) {
      // fetch all users
      var queryStr = "select * from users";
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    post: function(params, callback) {
      // create a user
      var queryStr = "insert into users(username) values (?)";
      db.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }
  }
};
