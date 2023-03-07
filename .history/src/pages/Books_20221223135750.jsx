import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { url } from "../const";
import { Dimmer , Loader } from "semantic-ui-react";

export const Books = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);

  const onUpdateList = () => {
    const data = {
      title,
      url: `${url}/books/${id}`,
      detail: "string",
      review,
    };

    axios
      .put(`${url}/books/${id}`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        history("/");
      })
      .catch((err) => {
        console.log(data.url);
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

  const [isLoading, setIsLoading] = useState(false);
  const [ resData, setResData ] = useState(null);

  function Loading({ inverted = true, content = "Loading..." }) {
    return (
      <Dimmer inverted={inverted} active={true}>
        <Loader content={content} />
      </Dimmer>
    );
  }

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
        setReview(list.review);
        setReviewer(list.reviewer);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(`情報の取得に失敗しました。${err}`);
        setIsLoading(false);
      });
  }, []);

  // ロード画面のコンポーネント

  return (
    <div>
      <Header />
      <main className="edit-list">
        <h2>レビュー詳細</h2>
        
        <p className="error-message">{errorMessage}</p>
        { isLoading ? <Loading /> : < Books data={resData}/> }
        <form className="edit-list-form">
          <label>タイトル</label>
          <br />
          <textarea className="edit-list-title" value={title} onChange={handleTitleChange} />
          <br />
          <label>レビュー</label>
          <br />
          <textarea className="edit-list-title" value={review} onChange={handleReviewChange} />
          <br />
          <label>レビュワー　{reviewer}</label>
          <br />

          <button type="button" className="delete-task-button" onClick={onDeleteList}>
            削除
          </button>
          <button type="button" className="edit-task-button" onClick={onUpdateList}>
            更新
          </button>
        </form>
      </main>
    </div>
  );
};
