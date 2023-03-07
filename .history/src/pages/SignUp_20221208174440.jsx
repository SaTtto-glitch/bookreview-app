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
  const handleFileChange = (e) => setIconurl(e.target.files);

  const onSignUp = () => {
    const data = {
      email,
      name,
      password,
      iconUrl,
    };
    console.log(data);

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

  const handleChangeFile = (e) => {
    const data = e.target.files;
    const img = new Compressor(data, {
      quality: 0.6,
      success() {
        //成功したときの処理
        const data = { iconUrl };

        axios
          .post(`${url}/uploads`, data)
          .then((res) => {
            const token = res.data.token;
            dispatch(signIn());
            setCookie("token", token);
            navigate("/");
          })
          .catch((err) => {
            setErrorMessge(`アップロードに失敗しました。 ${err}`);
          });
      },

      maxWidth: 400,
      maxHeight: 400,
      mimeType: "image/png",
      error() {
        "アップロードに失敗しました。";
      },
    });

    //画像プレビュー
    const { files } = e.target;
    setPreview(window.URL.createObjectURL(files[0]));
    c
  };

  const onFileUp = () => {
    const data = {
      iconUrl,
    };

    axios
      .post(`${url}/uploads`, data)
      .then((res) => {
        const token = res.data.token;
        dispatch(signIn());
        setCookie("token", token);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
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
