# task-management
このソフトは我の遊びで作られた物である。
信用しないこと
node.js
mariadb

サーバーで行うコマンド
```
npm install mysql2
npm install crypto
```

SQL文
ユーザーなどは各自作成・設定すること。
```
-- データベース作成
CREATE DATABASE task;
USE task;

-- Usersテーブル
CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Tasksテーブル
CREATE TABLE Tasks (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  deadline DATE,
  progress INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

```