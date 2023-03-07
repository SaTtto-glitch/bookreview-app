import "./signup.css";
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
          <p>
            <label>メールアドレス</label>
            <br />
            <input type="email" className="email-input" data-e2e="mail-input" />
            <span class="alertarea"></span>
            <br />
            <label>ユーザ名</label>
            <br />
            <input type="text" className="name-input" data-e2e="name-input" />
            <span class="alertarea"></span>
            <br />
            <label>パスワード</label>
            <br />
            <input type="password" className="password-input" />
            <span class="alertarea"></span>
            <br />
            <label>アイコン</label>
            <br />
            <input type="submit" value="送信">
          </p>
        </form>
      </main>
    </div>
  );
};
