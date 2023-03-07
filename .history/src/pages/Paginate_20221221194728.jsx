import ReactPaginate from "react-paginate";
import { useState } from "react";

const Paginate = (props) => {
  const setStateInfoAction = props;
  const [stateOfSelectPage, setStateOfSelectPage] = useState(0);


  const listLength = 30;
  const displayCount = 10;

  const handlePageClick = (page) => {
    setStateOfSelectPage(page.selected, "selectPage");
  };

  const pageCountCalc = (len, count) => {
    if (len < count) {
      return 1;
    }
    return Math.ceil(len / count);
  };

  console.log(stateOfSelectPage);

  return (
    <>
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
    </>
  );
};

export default Paginate;
