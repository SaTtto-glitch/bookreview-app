import "./signup.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Navigate, Link, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../authSlice";
import { url } from "../const";
// SubmitHandlerは、submitイベントに関する関数の型宣言に使う
import { useForm } from "react-hook-form";
// エラーメッセージコンポーネント
//import { ErrorMessage } from "@hookform/error-message";

export const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessge] = useState();

  const [cookies, setCookie] = useCookies();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSignUp = () => {
    const data = {
      email,
      name,
      password,
    };

    axios
      .post(`${url}/users`, data)
      .then((res) => {
        const token = res.data.token;
        dispatch(signIn());
        setCookie("token", token);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });

    if (auth) return <Route exact path="/" element={<Navigate to="/" />} />;
  };

  return (
    <div>
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <br />
        <Link to="/signin">ログイン</Link>
        <br />
        <br />
        <form className="signup-form">
          <p>
            <label>メールアドレス</label>
            <br />
            <input
              className="email-input"
              onChange={handleEmailChange}
              data-e2e="mail-input"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && <div className="error">メールアドレスを入力してください</div>}
            <br />
            <label>ユーザ名</label>
            <br />
            <input type="text" className="name-input" data-e2e="name-input" onChange={handleNameChange} />
            <span className="alertarea" />
            <br />
            <label>パスワード</label>
            <br />
            <input type="password" className="password-input" onChange={handlePasswordChange} name={cookies.name} />
            <span className="alertarea" />
            <br />
            <label>アイコン</label>
            <br />
          </p>
          <p>
            <button type="button" onClick={onSignUp} className="signup-button">
              作成
            </button>
          </p>
        </form>
      </main>
    </div>
  );
};
