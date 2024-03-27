import React from "react";

const NavPage = ({ totalPages, page, setPage }) => {
  const ArrayPage = [];
  for (let i = 1; i <= totalPages; i++) {
    ArrayPage.push(i);
  }

  return (
    <nav
      aria-label="Page navigation example"
      className="d-flex align-items-center justify-content-center mt-2"
    >
      <ul className="list-unstyled d-flex">
        {page === 1 ? (
          <li>
            <span className="position-relative d-block rounded-circle bg-transparent px-3 py-1.5 text-sm text-muted transition-all duration-300">
              Previous
            </span>
          </li>
        ) : (
          <li
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <span className="cursor-pointer position-relative d-block rounded-circle bg-transparent px-3 py-1.5 text-sm text-body transition-all duration-300 dark:text-body-secondary">
              Previous
            </span>
          </li>
        )}

        {ArrayPage.map((e, i) => (
          <li
            key={i}
            onClick={() => {
              setPage(e);
            }}
          >
            <span
              className={`cursor-pointer position-relative d-block rounded-circle px-3 py-1.5 text-sm transition-all duration-300   ${
                page === e ? "text-dark fw-bold bg-light" : "text-dark fw-light"
              }`}
            >
              {e}
            </span>
          </li>
        ))}

        {totalPages === page ? (
          <li>
            <span className="position-relative d-block rounded-circle bg-transparent px-3 py-1.5 text-sm text-muted transition-all duration-300">
              Next
            </span>
          </li>
        ) : (
          <li
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <span className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 cursor-pointer">
              Next
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavPage;
