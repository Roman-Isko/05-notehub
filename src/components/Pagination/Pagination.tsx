import type { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

// import ReactPaginate from "react-paginate";
// import css from "./Pagination.module.css";

// interface PaginationProps {
//   pageCount: number;
//   onPageChange: (selected: number) => void;
// }

// const Pagination = ({ pageCount, onPageChange }: PaginationProps) => {
//   return (
//     <ReactPaginate
//       containerClassName={css.pagination}
//       pageClassName={css.page}
//       activeClassName={css.active}
//       previousLabel={"←"}
//       nextLabel={"→"}
//       breakLabel={"..."}
//       onPageChange={({ selected }) => onPageChange(selected + 1)}
//       pageCount={pageCount}
//       marginPagesDisplayed={1}
//       pageRangeDisplayed={2}
//     />
//   );
// };

// export default Pagination;
