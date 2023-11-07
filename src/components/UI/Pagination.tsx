import React from "react";

const Pagination = ({ activePage, setActive, limit }) => {
  const handleNext = () => {
    const next = activePage === limit ? 1 : activePage + 1;
    setActive(next);
  };

  const handlePrev = () => {
    const prev = activePage === 1 ? limit : activePage - 1;
    setActive(prev);
  };

  return (
    <nav>
      <ul className="flex">
        <li>
          <a
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
            href="#"
            aria-label="Previous"
            onClick={handlePrev}
          >
            <span className="material-icons text-sm">left</span>
          </a>
        </li>
        {[...Array(limit)].map((_, index) => (
          <li key={index}>
            <a
              className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border ${
                activePage === index + 1
                  ? "bg-black text-white shadow-md"
                  : "border-blue-gray-100 bg-transparent"
              } p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`}
              href="#"
              onClick={() => setActive(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li>
          <a
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
            href="#"
            aria-label="Next"
            onClick={handleNext}
          >
            <span className="material-icons text-sm">right</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
