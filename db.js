const mysql = require('mysql2/promise');

// データベース接続情報
const dbConfig = {
  host: '192.168.100.15',
  user: 'robot',
  password: '',
  database: 'task',
  port: 3306
};

// データベースにユーザーデータを挿入する関数
async function insertUserData(username, email, password) {
  // ユーザー名の形式を確認
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  if (!usernameRegex.test(username)) {
    console.error('無効なユーザー名にゃん！');
    return false;
  }
  
  // メールアドレスの形式を確認
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error('無効なメールアドレスにゃん！');
    return false;
  }

  try {
    // データベースに接続
    const connection = await mysql.createConnection(dbConfig);

    // ユーザーデータをデータベースに挿入
    const [rows, fields] = await connection.execute('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);

    // 接続を閉じる
    connection.end();

    console.log('ユーザーデータがデータベースに保存されましたにゃん！');
    return true;
  } catch (error) {
    console.error('データベースへの保存エラー:', error);
    return false;
  }
}

module.exports = {
  insertUserData
};
