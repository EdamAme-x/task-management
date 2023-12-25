const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3000;

// ミドルウェアの設定
app.use(bodyParser.json());

// POSTリクエストを受け付けるエンドポイントの設定
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // db.jsの関数を呼び出してユーザーデータをデータベースに挿入
  const success = await db.insertUserData(username, email, password);

  if (success) {
    res.sendStatus(200); // 正常なレスポンスを返す
  } else {
    res.sendStatus(500); // エラーが発生した場合は500を返す
  }
});

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));

// その他のルートへのリクエストに対してindex.htmlを返す
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// サーバーを起動する
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});