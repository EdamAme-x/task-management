const mysql = require('mysql2');
const env = require('dotenv').config().parsed;

// ご主人さまのMariaDBの情報に合わせて変更してね
const connection = mysql.createConnection({
  host: env.host,
  user: env.user,
  password: env.password,
  database: env.database,
  port: env.port
});

connection.connect((err) => {
  if (err) {
    console.error('エラーが発生しましたにゃん！', err);
  } else {
    console.log('MariaDBに接続できましたにゃん！');
  }
});

// ちゃんと接続を切るにゃん！
connection.end();
