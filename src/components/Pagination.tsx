interface PaginationProps{
  postsPerPage:number,
  totalPosts: number,
  currentPage: number,
  paginate: (pageNumber: number) => void
}

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }: PaginationProps) => {

  const pageNumbers = []
  for(let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++){
    pageNumbers.push(i)
  }
  return(<>
    <nav>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => paginate(number)} className={`paginacao ${currentPage === number ? 'active' : ''}`}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </>)
}

export default Pagination