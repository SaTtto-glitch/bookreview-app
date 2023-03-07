import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";
import { url } from "../const";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import "./signin.css";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email, password })
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  return (
    <div>
      <main className="signin">
      <main class="form-signin">
  <form>
    <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        <p className="error-message">{errorMessage}</p>
        <form className="form-signin">
          <br />
          <input
            type="email"
            className="form-signin input form-floating:focus-within"
            value="Email address"
            {...register("email", {
              required: true,
              maxLength: 60,
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "メールアドレスの形式が不正です",
              },
            })}
            onChange={handleEmailChange}
          />
          <br />
          <ErrorMessage errors={errors} name="email" />
          <br />
          <br />
          <input type="password" className="form-signin input form-floating:focus-within" 
          value="Password"
          onChange={handlePasswordChange} name={cookies.name} />
          <br />
          <button type="button" className="signin-button" onClick={onSignIn}>
            サインイン
          </button>
        </form>
        <br />
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};
