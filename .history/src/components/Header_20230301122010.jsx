import { useState, useEffect, useRef, createRef } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import axios from "axios";
import { url } from "../const";
import "./header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  const [name, setName] = useState();
  const [iconURL, setIconURL] = useState();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/signin");
  };

  //

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setIconURL(res.data.iconUrl);
        console.log(res.data.iconUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <header className="header">
      <div className="container">
        <h1>書籍レビューアプリ</h1>
      </div>

      {auth ? (
        <>
          <Link to={`/edituser`}>
            <img src={iconURL} width="30" height="30"/>
            {name}さん
          </Link>
          <button onClick={handleSignOut} className="btn btn-primary">
            サインアウト
          </button>
        </>
      ) : (
        <>
          <Link to={`/signin`} className="btn btn-primary">
            ログイン
          </Link>
        </>
      )}
    </header>
  );
};
