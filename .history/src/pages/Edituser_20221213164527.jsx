import { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { Header } from "../components/Header";
import "./Home.css";
import { useNavigate, useParams } from "react-router-dom";


export const Edituser = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState();

  const handleNameChange = (e) => setName(e.target.value);


  const onUpdateUser = () => {
    console.log(isDone);
    
    const data = {
      name,
      email,
      password,
    };

    axios
      .put(`${url}/user`, data, {
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
      .get(`${url}/user`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setName(res.name);
        setEmail(res.email);
        setPassword(res.password);
      })
      .catch((err) => {
        setErrorMessage(`タスク情報の取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <div class="Block">
        <div class="Block__title">
          <p>ユーザー情報を編集する</p>
        </div>

        <div class="Block__element">
        <label></label>
        <input
            type="text"
            onChange={handleNameChange}
            className="edit-task-title"
            value={name}
          />
                  {email}          
        </div>
 
      </div>
    </div>
  );
};
