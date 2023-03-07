import "./signup.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const SignUp = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  document.addEventListener("DOMContentLoaded", function () {
    // ▼数字とハイフン記号の入力チェック用スクリプト
    var targets = document.getElementsByClassName("number");
    for (var i = 0; i < targets.length; i++) {
      // ▼文字が入力されたタイミングでチェックする：
      targets[i].oninput = function () {
        var alertelement = this.parentNode.getElementsByClassName("alertarea");
        if (this.value != "" && this.value.match(/[^\d\-]+/)) {
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
        <br />
        <Link to="/signin">ログイン</Link>
        <br />
        <br />
        <form className="signup-form" onSubmit={handleSubmit(handleOnSubmit)}>
          <p>
            <label>メールアドレス</label>
            <br />
            <input type="email" className="email-input" data-e2e="mail-input" />
            <span class="alertarea"></span>
            <br />
            <label>ユーザ名</label>
            <br />
            <input type="text" className="name-input" data-e2e="name-input" />
            <span class="alertarea"></span>
            <br />
            <label>パスワード</label>
            <br />
            <input type="password" className="password-input" />
            <span class="alertarea"></span>
            <br />
            <label>アイコン</label>
            <br />
          </p>
          <p>
            <input type="submit" value="送信" />
          </p>
        </form>
      </main>
    </div>
  );
};
