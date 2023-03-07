import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";
import "./signin.scss";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";
import { url } from "../const";

export const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  
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
        <br />
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};
