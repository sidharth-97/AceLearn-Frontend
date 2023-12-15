import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../store";
import { studentPremium } from "../../api/studentapi";
import { buyTutorPremium } from "../../api/tutorapi";
import { useState } from "react";

const PremiumMessage = () => {
  const [stripe, setStripe] = useState<any>();
  const stripePromise = loadStripe(
    "pk_test_51OA4ziSEjtBzAge5ZAWJV2Y2EW4v8d0iUt4DHgoUX09VWYiYhsJcUCARpvHLYj5ZLmjxNyCYLyEgJwcQugm6C3YL00VmY9Z4jW"
  );

  const { isStudent } = useSelector((state:RootState) => state.auth);
  const { isTutor } = useSelector((state: RootState) => state.auth);
  
  const handleClick = async () => {
    if (!stripe) {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    }
    if (isStudent) {
      const response = await studentPremium({ fees: "600" })
      if (response) {
        window.location.href = response.data.url;
      }
    } else if (isTutor) {
      const response = await buyTutorPremium({ fees: "600" })
      if (response) {
        window.location.href = response.data.url;
      }
  }
}

  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-4">
            Upgrade to Premium for Exclusive Content!
          </h1>
          <p className="text-gray-600 mb-8">
            Unlock premium features and content by becoming a premium user.
          </p>
          <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumMessage;
