/* eslint-disable */

/* 이 예제를 실행시키려면, sequelize 및 mysql2 설치가 필요합니다
 *   npm install sequelize
 *   npm install mysql2
 */


/* Sequelize 초기화에는 다음 종류의 인자가 필요합니다.
 *  - 호스트
 *  - 사용하는 데이터베이스 종류
 *  - 데이터베이스 이름
 *  - 로그인 아이디
 *  - 패스워드
 * 인스턴스 생성으로 데이터베이스에 연결할 수 있습니다 */

const Sequelize = require('sequelize');
const db = new Sequelize('chat', 'root', process.env.DATABASE_SPRINT_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});


/* db.define 은 객체 모델과 테이블 관계를 정의(mapping)합니다.
 * https://sequelize.org/v5/manual/models-definition.html
 *
 * 테이블 이름과 컬럼, 데이터 종류가 필요합니다.
 * STRING, INTEGER 등과 같은 데이터 종류는 다음에서 확인할 수 있습니다.
 * https://sequelize.org/v5/manual/data-types.html */

const User = db.define('User', {
  username: Sequelize.STRING
});

const Message = db.define('Message', {
  userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

/* Sequelize는 Promise와 체이닝을 통해 비동기 요청을 보다 쉽게 만들 수 있습니다 */

User.sync()
  .then(function () {
    // 새 객체를 만들어 테이블에 저장합니다.
    return User.create({ username: 'Jean Valjean' });
  })
  .then(function () {
    // 데이터베이스로부터 데이터를 객체 형태로 전달받습니다.
    return User.findAll({ where: { username: 'Jean Valjean' } });
  })
  .then(function (users) {
    users.forEach(function (user) {
      console.log(user.username + ' exists');
    });
    db.close();
  })
  .catch(function (err) {
    console.error(err);
    db.close();
  });