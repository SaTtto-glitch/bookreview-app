import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate, Route } from "react-router-dom";
/*import { signIn } from "../authSlice";*/

export const SignUp = () => {
/*  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessge] = useState();
  const [cookies, setCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);*/
  const onSignUp = () => {

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
        <form className="signup-form">
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
            className="email-input"
          />
          <br />
          <label>ユーザ名</label>
          <br />
          <input
            type="text"
            className="name-input"
          />
          <br />
          <label>パスワード</label>
          <br />
          <input
            type="password"
            className="password-input"
          />
          <br />
          <button type="button" className="signup-button">
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
