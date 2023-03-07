import axios from "axios";
import { useState } from "react";
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
  return (
    <div>
      <main className="signup">
        <h2>新規作成</h2>
        <Link to="/signin">ログイン</Link>
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
          <label>アイコン</label>
          <br />
          <button type="button" className="signup-button">
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
