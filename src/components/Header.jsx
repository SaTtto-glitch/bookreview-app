import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import axios from "axios";
import { url } from "../const";
import "./header.scss";
import { Link } from "react-router-dom";
import Logo from "./images/Logo.png";

export const Header = () => {
  const [name, setName] = useState();
  const [iconURL, setIconURL] = useState();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/signin");
  };

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
      })
      .catch((err) => {
      });
  }, []);

  var parent = document.querySelectorAll(".has-sub");

  var node = Array.prototype.slice.call(parent, 0);

  node.forEach(function (element) {
    element.addEventListener(
      "mouseover",
      function () {
        element.querySelector(".sub").classList.add("active");
      },
      false
    );
    element.addEventListener(
      "mouseout",
      function () {
        element.querySelector(".sub").classList.remove("active");
      },
      false
    );
  });

  return (
    <header className="header">
      <div className="gnavi">
        {auth ? (
          <>
            <div className="gnavi__inner">
              <div className="personal-account__data">
                <a href="#">
                  <span className="personal-account__data__avatar">
                    <img src={iconURL} width="30" height="30" />
                  </span>
                  <span className="personal-account__data__name">{name}</span>
                  <span className="personal-account__data__sub-text">さんのマイページ</span>
                </a>
              </div>

              <div className="has-sub">
                メニュー
                <ul className="sub">
                  <li>
                    <Link to={`/edituser`}>アカウント設定</Link>
                  </li>
                  <li>
                    <a href="#" onClick={handleSignOut}>
                      サインアウト
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to={`/signin`} className="btn btn-primary">
              ログイン
            </Link>
          </>
        )}
        <div className="header__main">
          <div className="logo">
            <img src={Logo} width="200px" />
          </div>
          <div className="container">
            <input type="search" name="search" placeholder="検索" />
            <input type="submit" name="submit" value="検索" />
          </div>
        </div>
      </div>
    </header>
  );
};
