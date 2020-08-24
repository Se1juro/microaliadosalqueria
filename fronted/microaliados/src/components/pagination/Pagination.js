import React from 'react';

export default function Pagination(props) {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {props.currentPage === 1 ? null : (
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              id="previous"
              onClick={() => props.movePages('prev')}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
        )}{' '}
        {props.rows.map((row) => (
          <li className="page-item" key={row}>
            <button
              className="page-link"
              onClick={() => props.selectNumPage(row)}
            >
              {row}
            </button>
          </li>
        ))}{' '}
        {props.currentPage === props.totalPage ? null : (
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Next"
              id="next"
              onClick={() => props.movePages('next')}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
