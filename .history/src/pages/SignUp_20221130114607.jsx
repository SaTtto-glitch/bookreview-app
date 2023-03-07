import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'

export const SignUp = () => {
  const { register, handleSubmit, errors, reset } = useForm<FormData>()
 
  const handleOnSubmit = (data: FormData) => {
      console.log(data.title);
      reset()
  }
  return (
    <div>
      <main className="signup">
        <h2>新規作成</h2>
        <br />
        <Link to="/signin">ログイン</Link>
        <br />
        <br />
        <form className="signup-form">
          <label>メールアドレス</label>
          <br />
          <input type="email" className="email-input" data-e2e="mail-input" ref={register({
                        required: 'タイトルは必ず入力してください。'
                    })}/>
          <br />
          <label>ユーザ名</label>
          <br />
          <input type="text" className="name-input" data-e2e="name-input" ref={register({
                        required: 'タイトルは必ず入力してください。'
                    })}/>
          <br />
          <label>パスワード</label>
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
