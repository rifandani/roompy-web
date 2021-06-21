import ReactPaginate from 'react-paginate'
import { Dispatch, SetStateAction } from 'react'
// files
import { Roompy } from 'utils/interfaces'

export interface PaginationProps {
  roompies: Roompy[]
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  limit: number
}

export default function Pagination({
  roompies,
  currentPage,
  setCurrentPage,
  limit,
}: PaginationProps): JSX.Element {
  const classNames =
    'bg-white text-purple-500 hover:bg-purple-100 px-2 py-1 border cursor-pointer rounded-md appearance-none focus:outline-none focus:ring focus:border-purple-300 list-none'

  const pageCount = Math.ceil(roompies.length / limit)

  return (
    <div className="flex flex-col items-center my-10">
      <article className="flex justify-center text-gray-500">
        Showing {limit * currentPage + 1} - {limit * (currentPage + 1)} of{' '}
        {roompies.length} Roompies
      </article>

      <ReactPaginate
        previousLabel="Previous"
        previousClassName={classNames}
        nextLabel="Next"
        nextClassName={classNames}
        breakLabel="..."
        breakClassName={classNames}
        containerClassName="flex justify-center my-5 gap-3"
        pageClassName={classNames}
        activeClassName="bg-purple-100 appearance-none focus:outline-none focus:ring focus:border-purple-300 list-none shadow-md"
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        onPageChange={(e) => setCurrentPage(e.selected)}
      />
    </div>
  )
}
