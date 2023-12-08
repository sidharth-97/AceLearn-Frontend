import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getalltutors } from "../../api/tutorapi";
import { Link } from "react-router-dom";
import Pagination from "../../components/UI/Pagination";
import { Tutor } from "../../model/tutorModel";

const TutorCardGrid = ({ selectedFilters }:any) => {
  const [tutorData, setTutorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(3);

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();

        if (searchQuery) {
          queryParams.append("search", searchQuery);
        }

        Object.entries(selectedFilters).forEach(([key, value]) => {
          if (value && (value as any[]).length > 0) {
            queryParams.append(key, (value as any).join(","));
          }
        });

        queryParams.append("page", activePage.toString());
        queryParams.append("limit", itemsPerPage.toString());

        const constructedQuery = `?${queryParams.toString()}`;
        console.log("Constructed Query:", constructedQuery);

        setQuery((prevQuery) => {
          if (prevQuery !== constructedQuery) {
            return constructedQuery;
          } else {
            return prevQuery;
          }
        });

        const response = await getalltutors(constructedQuery);
        if (response) {
          console.log(
            response.data.AllTutor,
            "ressssssssssssssssssssssssssssssssssss"
          );

          setTutorData(response.data.AllTutor);
          setLimit(Math.ceil(response.data.count / itemsPerPage));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [searchQuery, selectedFilters, activePage, itemsPerPage]);

  console.log(selectedFilters, "this is the selected filters");
  console.log(tutorData, "this is the tutor data");
  console.log(activePage, "active page");
  console.log(query, "this is the query");
  console.log(
    tutorData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage),
    "sliced datat"
  );

  return (
    <>
      <div className="text-center p-10">
        <div className="flex items-center justify-center w-full mb-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-base text-gray-500 font-thin"
            placeholder="Search for tutor"
          />
        </div>

        <section
          id="Projects"
          className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {!tutorData.length
            ? [1, 2, 3, 4, 5].map((index) => (
                <div
                  className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                  key={index}
                >
                  <div className="w-72 h-60 bg-gray-200 rounded-t-xl"></div>
                  <div className="px-4 py-3 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                      <Skeleton width={50} />
                    </span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      <Skeleton width={120} />
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">
                        <Skeleton width={50} />
                      </p>
                      <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">
                          <Skeleton width={50} />
                        </p>
                      </del>
                      <div className="ml-auto">
                        <Skeleton width={20} height={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : tutorData.map((tutor: Tutor, index) => (
                <Link to={`/tutor/tutorProfile/${tutor._id}`} key={index}>
                  <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <a href="#">
                      <img
                        src={`${tutor.image}`}
                        alt="Product"
                        className=" h-60 w-72 object-contain rounded-t-xl"
                      />
                      <div className="px-4 py-3 w-72">
                        <span className="text-gray-400 mr-3 uppercase text-xs">
                          {tutor.subject}
                        </span>
                        <p className="text-lg font-bold text-black truncate block capitalize">
                          {tutor.name}
                        </p>
                        <div className="flex items-center">
                          <p className="text-lg font-semibold text-black cursor-auto my-3">
                            Rs. {tutor.fee}
                          </p>
                          <del>
                            <p className="text-sm text-gray-600 cursor-auto ml-2">
                              Rs. {tutor.fee}
                            </p>
                          </del>
                          <div className="ml-auto">
                            &#11088;
                            {tutor.rating !== null && tutor.rating !== undefined
                              ? Math.floor(tutor.rating)
                              : "not rated"}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </Link>
              ))}
        </section>
        <Pagination
          activePage={activePage}
          setActive={setActivePage}
          limit={limit}
        />
      </div>
    </>
  );
};

export default TutorCardGrid;
