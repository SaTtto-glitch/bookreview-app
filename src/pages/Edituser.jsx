import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { Header } from "../components/Header";
import "./Home.css";
import { useNavigate } from "react-router-dom";

//ダブルクォーテーションは文字列型になる　空白はnull　別物 {}  []
export const Edituser = () => {
  const [name, setName] = useState("");
  const [iconUrl, seticonUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);

  const onUpdateUser = () => {
    const data = {
      name,
      iconUrl,
    };

    axios
      .put(`${url}/users`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        seticonUrl(res.data.iconUrl);
      })
      .catch((err) => {
        setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="Block">
        <div className="Block__title">
          <p>ユーザー情報を編集する</p>
        </div>

        <p className="error-message">{errorMessage}</p>
        <div className="Block__element">
          <label>ニックネーム</label>
          <input type="text" onChange={handleNameChange} className="edit-task-title" value={name} />
          <br />
          <img src={iconUrl} />
          <br />
          <button type="button" className="edit-task-button" onClick={onUpdateUser}>
            更新
          </button>
        </div>
      </div>
    </div>
  );
};
