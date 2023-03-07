import "./signup.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { url } from "../const";

export const SignUp = () => {
  const [errorMessage, setErrorMessge] = useState();

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

  document.addEventListener("DOMContentLoaded", function () {
    // ▼数字とハイフン記号の入力チェック用スクリプト
    var targets = document.getElementsByClassName("email-input");
    for (var i = 0; i < targets.length; i++) {
      // ▼文字が入力されたタイミングでチェックする：
      targets[i].oninput = function () {
        var alertelement = this.parentNode.getElementsByClassName("alertarea");
        if (this.value != "" && this.value.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
          // ▼何か入力があって、指定以外の文字があれば
          if (alertelement[0]) {
            alertelement[0].innerHTML = "入力には、数字とハイフン記号だけが使えます。";
          }
          this.style.border = "2px solid red";
        } else {
          // ▼何も入力がないか、または指定文字しかないなら
          if (alertelement[0]) {
            alertelement[0].innerHTML = "";
          }
          this.style.border = "1px solid black";
        }
      };
    }
    // ▲ここまで
  });

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
            <input type="email" className="email-input" data-e2e="mail-input" />
            <span className="alertarea" />
            <br />
            <label>ユーザ名</label>
            <br />
            <input type="text" className="name-input" data-e2e="name-input" />
            <span className="alertarea" />
            <br />
            <label>パスワード</label>
            <br />
            <input type="password" className="password-input" />
            <span className="alertarea" />
            <br />
            <label>アイコン</label>
            <br />
          </p>
          <p>
            <input type="submit" value="送信" data-e2e="submit-button" />
          </p>
        </form>
      </main>
    </div>
  );
};
