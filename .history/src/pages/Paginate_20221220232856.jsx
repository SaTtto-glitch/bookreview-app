import { useState, useEffect, useRef, createRef } from "react";
import ReactPaginate from "react-paginate";
import { url } from "../const";

let setStateOfSelectPage;

const handlePageClick = (page) => {
  setStateOfSelectPage(page.selected, "selectPage");
  console.log(page);
  console.log(setStateOfSelectPage);

  window.scrollTo(0, 50);
};

const pageCountCalc = (len, count) => {
  if (len < count) {
    return 1;
  }
  return Math.ceil(len / count);
};

const Paginate = (props) => {

  //offset用
  const [lists, setLists] = useState([]);

  const fetchPlanets = async (page) => {
    console.log(page);
    const res = await fetch(`${url}/books?offset=${page}`);
    return setLists(res.data);
  };

  const { listLength, displayCount, setStateInfoAction } = props;
  setStateOfSelectPage = setStateInfoAction;

  return (
    <>
      <ReactPaginate
        style={{ marginTop: 10, marginBottom: 100 }}
        pageCount={pageCountCalc(listLength, displayCount)}
        marginPagesDisplayed={5} // 先頭と末尾に表示するページ数
        pageRangeDisplayed={10} // 現在のページの前後をいくつ表示させるか
        onPageChange={fetchPlanets}
        containerClassName="pagination" // ul(pagination本体)
        pageClassName="page-item" // li
        pageLinkClassName="page-link"
        activeClassName="active"
        previousLabel="<"
        nextLabel=">"

        // 戻る・進む関連
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        disabledClassName="disabled"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
      />
    </>
  );
};

export default Paginate;
