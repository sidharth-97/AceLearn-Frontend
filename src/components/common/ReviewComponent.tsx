import React from "react";
import { useQuery } from "react-query";
import { getTutorReview } from "../../api/tutorapi";
import { useParams } from "react-router-dom";

const ReviewArticle = () => {
  const params = useParams();
  const { data: reviews, isLoading } = useQuery({
    queryFn: () => getTutorReview(params.id),
  });
  console.log(reviews);

  return (
    <>
       <h1 className="text-center text-2xl font-bold mb-4">Student Reviews</h1>
      {!isLoading && reviews?.data.length &&
        reviews?.data.map((item) => {
          {
            console.log(item);
          }
          return (
            <article className="py-2">
              <div className="flex items-center mb-4">
                <img
                  className="w-10 h-10 me-4 rounded-full"
                  src={item?.student.image || ""}
                  alt=""
                />
                <div className="font-medium text-black">
                  <p>
                    {item?.student.username}
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-sm text-gray-500 dark:text-gray-400"
                    >
                      Joined on August 2014
                    </time>
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                {[...Array(item.rating)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                  {[...Array(5-item.rating)].map((_, index) => (
                <svg
                  className="w-4 h-4 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                      ))}
                <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Thinking to buy another one!
                </h3>
              </div>
              <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Reviewed in the United Kingdom on{" "}
                  <time dateTime="2017-03-03 19:00">March 3, 2017</time>
                </p>
              </footer>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
               {item.description}
              </p>
              <p className="mb-3 text-gray-500 dark:text-gray-400">
                It is obviously not the same build quality as those very
                expensive watches. But that is like comparing a Citroën to a
                Ferrari. This watch was well under £100! An absolute bargain.
              </p>
            
              <aside>
               
                <div className="flex items-center mt-3">
                </div>
              </aside>
            </article>
         
          );
        })}
    </>
  );
};

export default ReviewArticle;
