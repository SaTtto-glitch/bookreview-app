import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { url } from "../const";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Home.css"

export const NewBooks = (props) => {
  const [title, setTitle] = useState("");
  const [bookURL, setBookURL] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const history = useNavigate();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleURLChange = (e) => setBookURL(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);

  const onCreateTask = () => {
    const data = {
      title,
      url: bookURL,
      detail,
      review,
    };
    axios
      .post(`${url}/books`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        history("/");
      })
      .catch((err) => {
        setErrorMessage(`作成に失敗しました。${err}`);
      });
  };


  const modalContent = {
    background: "white",
    width: "50%",
    padding: "10px",
    borderRadius: "3px",
  };

  const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const closeModal = () => {
    props.setShowModal(false);
  };
  
  return (
    <div>
      {props.showFlag ? (
      <main className="new-task"  id="overlay" style={overlay}>
        <div id="modalContent" style={modalContent}>
        <p className="error-message">{errorMessage}</p>
        <form className="new-task-form">
          <h3>感想・レビューを投稿する</h3>
          <label>書籍タイトル</label>
          <br />
          <input type="text" onChange={handleTitleChange} className="new-task-title" />
          <br />
          <label>詳細</label>
          <br />
          <textarea type="text" onChange={handleDetailChange} className="new-task-detail" />
          <br />

          <label>感想・レビュー</label>
          <br />
          <textarea type="text" onChange={handleReviewChange} className="new-task-detail" />
          <br />

          <button type="button" className="new-task-button" onClick={onCreateTask}>
            登録する
          </button>
        </form>
        <button onClick={closeModal}></button></div>
      </main>) : (
        <></>// showFlagがfalseの場合はModalは表示しない
      )}
    </div>
  );
};
