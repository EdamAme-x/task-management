const getConnection = require('./db');

// データベースに接続してクエリを実行する例
const runQuery = async () => {
  const connection = await getConnection();

  try {
    // ここでクエリを実行するにゃん
  } catch (error) {
    console.error('エラーが発生しましたにゃん！', error);
  } finally {
    // クエリが終わったら必ず接続を解放するにゃん
    connection.release();
  }
};

runQuery();
