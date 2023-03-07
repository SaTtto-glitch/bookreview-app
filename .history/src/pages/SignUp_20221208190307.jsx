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
import { ErrorMessage } from "@hookform/error-message";
import Compressor from "compressorjs";

export const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [iconUrl, setIconurl] = useState("");
  const [preview, setPreview] = useState("");

  const [errorMessage, setErrorMessge] = useState();

  const [cookies, setCookie] = useCookies();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleChangeFile = (e) => {
    setIconurl(e.target.files[0]);
    //画像プレビュー
    setPreview(window.URL.createObjectURL(e.target.files[0]));
  };

  const onSignUp = () => {
    const data = {
      email,
      name,
      password,
    };
    console.log(data);
    console.log(data)
    
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

    //画像アップロード
    new Compressor(iconUrl, {
      maxWidth: 50,
      maxHeight: 40,

      success(result) {
        console.log(result);
        const fileData = iconUrl;

        axios
          .post(`${url}/uploads`, fileData)
          .then((res) => {
            const token2 = res.data.token;
            dispatch(signIn());
            setCookie("token", token2);
            navigate("/");
          })
          .catch((err) => {
            setErrorMessge(`アップロードに失敗しました。 ${err}`);
          });
      },

      mimeType: "image/png",
      error(err) {
        console.log(err);
      },
    });
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
              type="email"
              className="email-input"
              data-e2e="mail-input"
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
            <input className="icon-input" type="file" name="icon" accept="image/*" onChange={handleChangeFile} />
            <img src={preview} />
          </p>
          <p>
            <button type="button" onClick={handleSubmit(onSignUp)} className="signup-button">
              作成
            </button>
          </p>
        </form>
      </main>
    </div>
  );
};
