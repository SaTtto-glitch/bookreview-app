import { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { Header } from "../components/Header";
import "./Home.css";

export const Edituser = () => {
  const [lists, setLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const [selectListId, setSelectListId] = useState();

  useEffect(() => {
    axios
      .get(`${url}/books`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
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
          
        </div>
 
      </div>
    </div>
  );
};
