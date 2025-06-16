import ReactPaginate from "react-paginate";
import "./pagination.css";

export default function PaginatedItems({ itemsPerPage, data, setPage }) {
  let pageCount = Math.ceil(data / itemsPerPage);
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        onPageChange={(e) => setPage(e.selected + 1)}
        renderOnZeroPageCount={null}
        containerClassName="pagination-custom d-flex align-items-center justify-content-end "
        pageLinkClassName="pagination-tag-anchor  mx-2 rounded-circle"
        activeLinkClassName=" text-white bg-primary"
      />
    </>
  );
}
