import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { url } from "../const";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

export const NewBooks = () => {
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


  return (
    <div>
      <Header />
      <main className="new-task"  id="overlay" style={overlay}>
        <p className="error-message">{errorMessage}</p>
        <form className="new-task-form">
          <br />
          <label>書籍タイトル</label>
          <br />
          <input type="text" onChange={handleTitleChange} className="new-task-title" />
          <br />
          <label>詳細</label>
          <br />
          <textarea type="text" onChange={handleDetailChange} className="new-task-detail" />
          <br />

          <label>URL</label>
          <br />
          <textarea type="text" onChange={handleURLChange} className="new-task-detail" />
          <br />

          <label>レビュー</label>
          <br />
          <textarea type="text" onChange={handleReviewChange} className="new-task-detail" />
          <br />

          <button type="button" className="new-task-button" onClick={onCreateTask}>
            作成
          </button>
        </form>
        <button onClick={closeModal}>Close</button>
      </main>
    </div>
  );
};
