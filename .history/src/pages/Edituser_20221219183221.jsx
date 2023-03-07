import { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { Header } from "../components/Header";
import "./Home.css";
import { useNavigate, useParams } from "react-router-dom";

export const Edituser = () => {
  const [name, setName] = useState();
  const [iconUrl, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const onUpdateUser = () => {
    const data = {
      name,
      email,
      password,
    };

    axios
      .put(`${url}/users`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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
        setEmail(res.data.iconUrl);
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <div class="Block">
        <div class="Block__title">
          <p>ユーザー情報を編集する</p>
        </div>
        
        <p className="error-message">{errorMessage}</p>
        <div class="Block__element">
          <label>ニックネーム</label>
          <input type="text" onChange={handleNameChange} className="edit-task-title" value={name} />
          <img src={iconURL} />
          <button type="button" className="edit-task-button" onClick={onUpdateUser}>
            更新
          </button>
        </div>
      </div>
    </div>
  );
};
