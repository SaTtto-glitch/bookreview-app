import './App.css';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const SignUp = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  const handleOnSubmit = (data) => {
    console.log(data.title);
    reset();
  };
  return (
    <div>
      <main className="signup">
        <h2>新規作成</h2>
        <br />
        <Link to="/signin">ログイン</Link>
        <br />
        <br />
        <form className="signup-form" onSubmit={handleSubmit(handleOnSubmit)}>
          <label>メールアドレス</label>
          <span class="alertarea"></span>
          <br />
          <input type="email" className="email-input" data-e2e="mail-input" />
          <br />
          <label>ユーザ名</label>
          <span class="alertarea"></span>
          <br />
          <input type="text" className="name-input" data-e2e="name-input" />
          <br />
          <label>パスワード</label>
          <span class="alertarea"></span>
          <br />
          <input type="password" className="password-input" />
          <br />
          <label>アイコン</label>
          <br />
          <button type="button" className="signup-button" data-e2e="submit-button">
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
