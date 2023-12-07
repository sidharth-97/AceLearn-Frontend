import { Link } from "react-router-dom";
import Navbar from "./navbar";

const PaymentFailed = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 h-full">
        <div className="bg-white p-6  md:mx-auto mt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-red-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M20 4.52l-1.48-1.48-6.02 6.02-6.02-6.02-1.48 1.48 6.02 6.02-6.02 6.02 1.48 1.48 6.02-6.02 6.02 6.02 1.48-1.48-6.02-6.02z"
            />
          </svg>

          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Failed!
            </h3>
            <p className="text-gray-600 my-2">
              Unfortunately your payment failed.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <Link
                to={"/"}
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
