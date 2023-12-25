async function signup() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
      alert('サインイン成功！');  // 成功時の処理
    } else {
      alert('サインイン失敗。ユーザー名またはメールアドレスが既に使用されています。');  // 失敗時の処理
    }
  } catch (error) {
    console.log('エラーが発生しましたにゃん！', error);
  }
}
