import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setPage: (num: number) => void;
};

const Pagination = ({ totalPages, currentPage, setPage }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
