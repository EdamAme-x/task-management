async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessageElement = document.getElementById('errorMessage');

  // エラーメッセージをクリア
  document.getElementById('usernameError').innerHTML = '';
  document.getElementById('passwordError').innerHTML = '';
  errorMessageElement.innerHTML = '';

  // ユーザー名とパスワードが入力されているかチェック
  if (!username || !password) {
    errorMessageElement.innerHTML = 'ユーザー名とパスワードを入力してくださいにゃん！';
    return;
  }

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    console.log('ログイン成功にゃん！');
    window.location.href = '/'; // 成功したらリダイレクトなど
  } else {
    console.error('ログインエラー:', response.status);
    const responseBody = await response.json(); // エラーレスポンスの本文を取得

    if (responseBody && responseBody.message) {
      errorMessageElement.innerHTML = responseBody.message;
    } else {
      errorMessageElement.innerHTML = 'エラーが発生しましたにゃん！';
    }
  }
}
