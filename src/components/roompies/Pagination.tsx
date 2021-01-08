import { useState } from 'react';
import ReactPaginate from 'react-paginate';
// files
import { RoompiesProps } from '../../utils/interfaces';

export default function Pagination({ roompies }: RoompiesProps) {
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const classNames = 'bg-white text-blue-500 px-2 py-1 border rounded-md';

  const pageCount = Math.ceil(roompies.length / limit);

  return (
    <div className="flex flex-col items-center my-10">
      <article className="flex justify-center">
        Showing {limit * currentPage + 1} - {limit * (currentPage + 1)} of{' '}
        {roompies.length} roompies
      </article>

      <ReactPaginate
        previousLabel="previous"
        previousClassName={classNames}
        nextLabel="next"
        nextClassName={classNames}
        breakLabel="..."
        breakClassName={classNames}
        containerClassName="flex justify-center my-5 gap-3"
        pageClassName={classNames}
        activeClassName="bg-blue-100"
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        onPageChange={(e) => setCurrentPage(e.selected)}
      />
    </div>
  );
}
