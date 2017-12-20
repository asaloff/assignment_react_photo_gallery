import React from 'react';
import PaginationLink from './elements/PaginationLink';

const Pagination = ({ collection, currentPage, perPage, onClick }) => {
  const length = collection.length;
  const amountOfPages = Math.ceil(length / parseInt(perPage, 10));
  const paginationLinks =[];

  const previousPage = currentPage - 1 || null;
  if (previousPage) {
    paginationLinks.push(
      <PaginationLink
        href={previousPage}
        onClick={onClick}
        key="previous"
        value={previousPage}
        currentPage={currentPage}
      >
        Previous
      </PaginationLink>
    );
  }

  for (var i = 1; i <= amountOfPages; i++) {
    paginationLinks.push(
      <PaginationLink
        href={i}
        onClick={onClick}
        key={i}
        value={i}
        currentPage={currentPage}
      >
        {i}
      </PaginationLink>
    );
  }

  // if there is a next page
  if (currentPage + 1 <= amountOfPages) {
    paginationLinks.push(
      <PaginationLink
        href={currentPage + 1}
        onClick={onClick}
        key="next"
        value={currentPage + 1}
        currentPage={currentPage}
      >
        Next
      </PaginationLink>
    );
  }


  return (
    <div className="Pagination">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {paginationLinks}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
