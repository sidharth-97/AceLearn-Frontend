import { useQuery } from "react-query";
import { tutoravilable } from "../../api/tutorapi";

const TutorCard = ({ tutor }: any) => {
  console.log(tutor, "this is the tutor from card");

  const { data } = useQuery({
    queryFn: () => tutoravilable(tutor._id),
    queryKey: [`${tutor.email}`],
  });

  console.log(data, "tutor available");

  return (
    <div>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
          <img
            src={`${tutor.image}`}
            alt="Product"
            className=" h-60 w-72 object-contain rounded-t-xl"
          />

          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {tutor.subject&&tutor.subject.join(", ")}
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              {tutor.name}
            </p>
            {data?.data ? (
              <span className="text-green-400">Slots available</span>
            ) : (
              <span className="text-red-300">Slots Unavailable</span>
            )}
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
    </div>
  );
};

export default TutorCard;
