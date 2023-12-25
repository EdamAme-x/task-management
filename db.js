const mysql = require('mysql2/promise');  // 注意: 'mysql2/promise'を使用する

const dbConfig = {
  host: '192.168.100.15',
  user: 'robot',
  password: '',
  database: 'task',
  port: 3306
};

// データベース接続プールの作成
const pool = mysql.createPool(dbConfig);

// プールからコネクションを取得する関数
const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('データベース接続エラー:', error);
    throw error;
  }
};

module.exports = getConnection;
