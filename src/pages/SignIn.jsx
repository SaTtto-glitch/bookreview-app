import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";
import { url } from "../const";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
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
  // プロパティで制限とかいろいろ指定できるのでｇｇる

  return (
    <div className="form-top">
      <main className="form-signin">
        <h2 className="h3 mb-3 fw-normal">サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
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
            <label for="floatingInput">Email address</label>
          </div>

          <br />
          <ErrorMessage errors={errors} name="email" />
          <br />
          <div className="form-floating">
            <input type="password" className="form-control" onChange={handlePasswordChange} name={cookies.name} />
            <label for="floatingPassword">Password</label>
          </div>
          <br />
          <button type="button" className="w-100 btn btn-lg btn-primary" onClick={onSignIn}>
            サインイン
          </button>
        </form>
        <br />
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};
