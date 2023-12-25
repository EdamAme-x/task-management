const mysql = require('mysql2');

// ご主人さまのMariaDBの情報に合わせて変更してね
const connection = mysql.createConnection({
  host: '192.168.100.15',
  user: 'robot',
  password: '',
  database: 'test'
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
