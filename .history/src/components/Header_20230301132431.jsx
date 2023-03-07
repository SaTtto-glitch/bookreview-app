import { useState, useEffect, useRef, createRef } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import axios from "axios";
import { url } from "../const";
import "./header.scss";
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
      <div className="gnavi">
        <div className="gnavi__inner">
          <div className="personal-account">
            
              {auth ? (
                <a>
                  <Link to={`/edituser`}>
                    <span class="personal-account__data__avatar">
                      <img src={iconURL} width="30" height="30" />
                    </span>
                    <span class="personal-account__data__name">{name}</span>
                    <span class="personal-account__data__sub-text">さんのマイページ</span>
                  </Link>

                  <div className="personal-account__menu">
                    メニュー
                    <ul class="dropdown">
                      <li>
                        <a href="#" onClick={handleSignOut}>
                          アカウント設定
                        </a>
                      </li>
                      <li>
                        <a href="#" onClick={handleSignOut}>
                          サインアウト
                        </a>
                      </li>
                    </ul>
                  </div>
                </a>
              ) : (
                <>
                  <Link to={`/signin`} className="btn btn-primary">
                    ログイン
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
