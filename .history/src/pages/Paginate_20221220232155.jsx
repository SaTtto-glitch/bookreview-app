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

//offset用
const [lists, setLists] = useState([]);

const fetchPlanets = async (page) => {
  console.log(page);
  const res = await fetch(`${url}/books?offset=${page}`);
  return setLists(res.data);
};

const pageCountCalc = (len, count) => {
  if (len < count) {
    return 1;
  }
  return Math.ceil(len / count);
};

const Paginate = (props) => {
  const { listLength, displayCount, setStateInfoAction } = props;
  setStateOfSelectPage = setStateInfoAction;

  return (
    <>
      <ReactPaginate
        style={{ marginTop: 10, marginBottom: 100 }}
        pageCount={pageCountCalc(listLength, displayCount)}
        marginPagesDisplayed={5}
        pageRangeDisplayed={10}
        onPageChange={fetchPlanets}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousLabel="<"
        nextLabel=">"
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
