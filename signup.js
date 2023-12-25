// signup.js

// Node.jsの環境ではdocumentは使えないので、HTMLとは独立して処理するにゃん
const signup = async (username, email, password) => {
  try {
    // Node.jsでfetchを使うため、node-fetchを動的インポートするにゃん
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('サインアップに成功しましたにゃん！');
    } else {
      console.log('サインアップに失敗しましたにゃん…');
    }
  } catch (error) {
    console.error('エラーが発生しましたにゃん！', error);
  }
};

// Node.js環境でのテストのため、直接関数を呼び出すにゃん
signup('testuser', 'test@example.com', 'testpassword');
