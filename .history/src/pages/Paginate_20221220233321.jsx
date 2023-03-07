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
  const { listLength, displayCount, setStateInfoAction, currentPage } = props;
  setStateOfSelectPage = setStateInfoAction;

  return (
    <>
      <ReactPaginate
        style={{ marginTop: 10, marginBottom: 100 }}
        pageCount={pageCountCalc(listLength, displayCount)} // トータルページ数
        forcePage={currentPage} // 現在のページをreactのstateで管理
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
    </>
  );
};

export default Paginate;
