import React from "react";

const Pagination = ({ activePage, setActive, limit }) => {
  const handleNext = (e) => {
    e.preventDefault();
    const next = activePage === limit ? 1 : activePage + 1;
    console.log("Next page:", next);
    setActive(next);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    const prev = activePage === 1 ? limit : activePage - 1;
    console.log("Prev page:", prev);
    setActive(prev);
  };

  return (
    <nav>
      <ul className="flex">
        <li>
          <button
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
            aria-label="Previous"
            onClick={(e) => handlePrev(e)}
          >
            <span className="material-icons text-sm">left</span>
          </button>
        </li>
        {[...Array(limit)].map((_, index) => (
          <li key={index}>
            <button
              className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border ${
                activePage === index + 1
                  ? "bg-black text-white shadow-md"
                  : "border-blue-gray-100 bg-transparent"
              } p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`}
              onClick={(e) => {
                e.preventDefault();
                setActive(index + 1);
              }}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
            aria-label="Next"
            onClick={(e) => handleNext(e)}
          >
            <span className="material-icons text-sm">right</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
