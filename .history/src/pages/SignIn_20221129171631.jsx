import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <div>
      <main className="signin">
        <h2>サインイン</h2>
        <form className="signin-form">
          <label className="email-label">メールアドレス</label>
          <br />
          <input
            type="email"
            className="email-input"
          />
          <br />
          <label className="password-label">パスワード</label>
          <br />
          <input
            type="password"
            className="password-input"
          />
          <br />
          <button type="button" className="signin-button">
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};
