import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props: { number: any }) => {
  const { number } = props;
  console.log(number);

  const [pageCount, setPageCount] = useState(0);
  console.log(pageCount);

  // 1ページに表示するTodoの数
  const PerPage = 6;
  // ページの最初のTodoの配列番号を格納
  const [firstOffset, setFirstOffset] = useState(0);
  // 次ページの最初のTodoの配列番号を取得
  const endOffset = firstOffset + PerPage;
  // 何ページなるかの計算：小数点以下を繰り上げる
  // const totalPage = Math.ceil(todos.length / PerPage);
  // 配列を切り取る
  // const currenetTodos = todos.slice(firstOffset, endOffset);

  // 何ページなるかの計算：小数点以下を繰り上げる
  setPageCount(Math.ceil(number / PerPage));

  const handlePageClick = (e: any) => {};

  return (
    <div>
      <div>Pagination</div>
      <ReactPaginate pageCount={pageCount} onPageChange={handlePageClick} />
    </div>
  );
};

export default Pagination;
