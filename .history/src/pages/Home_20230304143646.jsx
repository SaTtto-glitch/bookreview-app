import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { Header } from "../components/Header";
import "./Home.css";
import ReactPaginate from "react-paginate";

//データ表示用コンポーネント
export const Home = () => {
  const [lists, setLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const [selectPage, setSelectPage] = useState(0);

  useEffect(() => {
    axios
      .get(`${url}/books?offset=${selectPage}`, {
        //selectPageの名前が、取得している数字と違いわかりづらい。直観的な名前にちゃんとする
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
        console.log(res.json);
      })
      .catch(() => {
        axios
          .get(`${url}/public/books?offset=${selectPage}`)
          .then((res) => {
            setLists(res.data);
          })
          .catch((err) => {
            setErrorMessage(`リストの取得に失敗しました。${err}`);
          });
      });
  }, [selectPage]);

  const listLength = 30;
  //本来、バックエンド側で全件取得できるAPIがある
  //今回の場合はAPIを何度も呼ぶしかない（非推奨）
  const displayCount = 10;

  const curtIndex = selectPage;

  console.log(curtIndex);

  const handlePageClick = (page) => {
    setSelectPage(page.selected * 10, "selectPage");
  };

  const pageCountCalc = (len, count) => {
    if (len < count) {
      return 1;
    }
    return Math.ceil(len / count);
  };

  const [selectBookId, setSelectBookId] = useState("");
  //postにボディを設定する
  const onHandlelinkclick = () => {
    axios
      .post(
        `${url}/logs`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        setSelectBookId(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 日付を取得
  var day = new Date(document.lastModified);
  var y = day.getFullYear();
  var m = day.getMonth() + 1;
  var d = day.getDate();

  // 曜日を指定して出力
  var week = new Array("日", "月", "火", "水", "木", "金", "土");
  var w = week[day.getDay()];

  //日にちの整形
  if (m < 10) m = "0" + m;
  if (d < 10) d = "0" + d;

  return (
    <div>
      <Header />
      <div className="Block">
      <div className="Block__main">
        <p className="title-content">みんなの感想・レビュー</p>
        <p className="error-message">{errorMessage}</p>
        <Link to={`/newbooks`}>感想・レビューを投稿する</Link>

        <div className="Block__element">
          {" "}
          <ul>
            {lists.map((list) => {
              return (
                <li key={list.id} className="Block__element--modifier">
                  <div className="frame__header">
                    <span className="reviewer">{list.reviewer}</span>
                  </div>
                  <Link to={`/books/${list.id}`} onClick={onHandlelinkclick}>
                    {list.title}
                  </Link>
                  <div className="frame__details">
                    <span className="">
                      <span>更新日 </span> {y} 年 {m} 月 {d} 日 ( {w} )
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <ReactPaginate
            style={{ marginTop: 10, marginBottom: 100 }}
            pageCount={pageCountCalc(listLength, displayCount)} // トータルページ数
            onPageChange={handlePageClick}
            marginPagesDisplayed={5} // 先頭と末尾に表示するページ数
            pageRangeDisplayed={10} // 現在のページの前後をいくつ表示させるか
            containerClassName="pagination" // ul(pagination本体)
            pageClassName="page-item" // li
            pageLinkClassName="page-link" // a
            activeClassName="active" // active.li
            previousLabel="<" // a
            nextLabel=">" // a
            // 戻る・進む関連
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
            disabledClassName="disabled"
            // 中間ページの省略表記関連
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
          />
        </div>
      </div>
    </div></div>
  );
};
