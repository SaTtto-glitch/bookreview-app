import "./signup.css";
import { Link } from "react-router-dom";

export const SignUp = () => {

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
        <br />
        <Link to="/signin">ログイン</Link>
        <br />
        <br />
        <form class="checkform" name="sampleform" method="post" action="***">
  <p>
    お名前：
    <input class="chars2" type="text" name="NameText" size="20">
    <span class="alertarea"></span>
  </p>
  <p>
    ふりがな：
    <input class="furigana" type="text" name="FuriganaText" size="30">
    <span class="alertarea"></span>
  </p>
  <p>
    郵便番号：
    <input class="number" type="text" name="ZipText" size="15">
    <span class="alertarea"></span>
  </p>
  <p>
    <input class="alpha" type="text" name="IdText" size="20">
    <span class="alertarea"></span>
  </p>
  <p>
    コメント：
    <textarea class="chars2"></textarea>
    <span class="alertarea"></span>
  </p>

  <p><input type="submit" value="送信"></p>
</form>
      </main>
    </div>
  );
};
