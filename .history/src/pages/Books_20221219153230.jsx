import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { url } from "../const";

export const Books = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [review, setReview] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const onUpdateList = () => {
    const data = {
      id,
      title,
      url,
      review,
      reviewer,
    };

    axios
      .put(
        `${url}/books/${id}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then(() => {
        history("/");
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。 ${err}`);
      });
  };

  const onDeleteList = () => {
    axios
      .delete(`${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setErrorMessage(`削除に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const list = res.data;
        setTitle(list.title);
      })
      .catch((err) => {
        setErrorMessage(`リスト情報の取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="edit-list">
        <h2>レビュー編集</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="edit-list-form">
          <label>タイトル</label>
          <br />
          <input type="text" className="edit-list-title" value={title} onChange={handleTitleChange} />
          <br />
          <label>URL</label>
          <br />
          <input type="text" className="edit-list-title" value={title} onChange={handleTitleChange} />
          <br />
          <label>レビュー</label>
          <br />
          <input type="text" className="edit-list-title" value={title} onChange={handleTitleChange} />
          <br />
          <label>レビュワー</label>
          <br />
          <input type="text" className="edit-list-title" value={title} onChange={handleTitleChange} />
          <br />
          <button type="button" className="delete-list-button" onClick={onDeleteList}>
            削除
          </button>
          <button type="button" className="edit-list-button" onClick={onUpdateList}>
            更新
          </button>
        </form>
      </main>
    </div>
  );
};
