import React from 'react';

const PaginantionLink = ({ href, children, onClick, value, currentPage }) => {
  const active = currentPage === value ? 'active' : '';

  return (
    <li className={`page-item ${ active }`}>
      <a className="page-link" href={href} onClick={onClick} value={value}>
        {children}
      </a>
    </li>
  );
};

export default PaginantionLink;
