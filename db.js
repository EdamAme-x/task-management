const mysql = require('mysql2/promise');
const crypto = require('crypto');

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

  // パスワードの要件を確認
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    console.error('パスワードが要件を満たしていませんにゃん！');
    return { success: false, message: 'パスワードが要件を満たしていませんにゃん！' };
  }

  try {
    // パスワードをハッシュ化
    const hashedPassword = crypto.createHash('sha256').update(username + password).digest('hex');

    // データベースに接続
    const connection = await mysql.createConnection(dbConfig);

    // ユーザー名の重複を確認
    const [usernameRows] = await connection.execute('SELECT * FROM Users WHERE username = ?', [username]);
    if (usernameRows.length > 0) {
      // ユーザー名が既に存在する場合はエラーメッセージを返す
      connection.end();
      console.error('ユーザー名が重複していますにゃん！');
      return { success: false, message: 'ユーザー名が既に存在していますにゃん！' };
    }

    // メールアドレスの重複を確認
    const [rows] = await connection.execute('SELECT * FROM Users WHERE email = ?', [email]);
    if (rows.length > 0) {
      // メールアドレスが既に存在する場合はエラーメッセージを返す
      connection.end();
      console.error('メールアドレスが重複していますにゃん！');
      return { success: false, message: 'メールアドレスが既に存在していますにゃん！' };
    }

    // ユーザーデータをデータベースに挿入
    const [insertResult] = await connection.execute('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

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
