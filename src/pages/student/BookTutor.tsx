import { useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navbar from "../../components/common/navbar";
import img from "../../assets/Screenshot_2023-11-02_000343-removebg-preview.png";
import { useQuery} from "react-query";
import { TutorDetails,getTutorSchedule } from "../../api/tutorapi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { bookWithWallet, paymentsession } from "../../api/studentapi";
const stripePromise = loadStripe(
  "pk_test_51OA4ziSEjtBzAge5ZAWJV2Y2EW4v8d0iUt4DHgoUX09VWYiYhsJcUCARpvHLYj5ZLmjxNyCYLyEgJwcQugm6C3YL00VmY9Z4jW"
);

const BookTutor = () => {
  const today = new Date();
  const [value, onChange] = useState<any>(today);
  const [tutorSchedule, setTutorSchedule] = useState<any>({});
  const [timeArray, setTimeArray] = useState(new Set());
  const [includedDates, setIncludedDates] = useState<Date[]>([]);
  const [stripe, setStripe] = useState<any>();
  const params: any = useParams();
  const { isStudent } = useSelector((state: any) => state.auth);
  const {
    isLoading,
  } = useQuery("schedule", () => getTutorSchedule(params.id), {
    onSuccess: (data) => {
      const included = data?.data[0].timing
        .filter((item: { student: any; }) => !item.student)
        .map((item: { date: string | number | Date; }) => new Date(item.date));
      setIncludedDates(included); //

      const groupedDates = data?.data[0].timing.reduce(
        (grouped: any, item: any) => {
          includedDates.push(item.date);
          if (!item.student) {
            const date = new Date(item.date).toLocaleDateString();

            if (!grouped[date]) {
              grouped[date] = [];
            }
            const datee = new Date(item.date);
            const hours = String(datee.getUTCHours()).padStart(2, "0");
            const minutes = String(datee.getUTCMinutes()).padStart(2, "0");
            const timeString = `${hours}:${minutes}`;

            grouped[date].push(timeString);
          }
          return grouped;
        },
        {}
      );
      setTutorSchedule(groupedDates);
    },
  });
  if (isLoading) {
  <div>Loading....</div>
}
  // const bookTutorMutation = useMutation(bookTutor, {
  //   onSuccess: (data) => {

  //     toast.success("Booking successful");
  //     refetch();
  //   },
  //   onError: (error) => {
  //     console.error("Error while booking tutor: ", error);
  //     toast.error("Booking failed");
  //   },
  // });

  const handleClick = (time: string) => {
    const givenDate = new Date(value); // Using 'value' directly as it's already a Date object
    const givenHour = time;
    const [hours, minutes] = givenHour.split(":").map(Number);

    givenDate.setHours(hours);
    givenDate.setMinutes(minutes);

    const utcDate = new Date(
      givenDate.getTime() - givenDate.getTimezoneOffset() * 60000
    );
    const utcToString = utcDate.toISOString();

    setTimeArray((prevTimeArray) => new Set(prevTimeArray.add(utcToString))); // Update using the previous state
  };
  console.log(timeArray, "time array");

  const handleStripePayment = async () => {
    console.log("here");
    if(timeArray.size ==0) return toast.error("Pick a date")
    const tutordetails = await TutorDetails(params.id);

    let object1;
    if (tutordetails) {
      object1 = {
        tutor: params.id,
        fees: Array.from(timeArray).length * tutordetails.data.fee,
        timing: {
          date: Array.from(timeArray),
          student: isStudent._id,
          fee: tutordetails.data.fee,
        },
      };
    }

    if (!stripe) {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    }
    const response = await paymentsession(object1);
    if (response) {
      window.location.href = response.data.url;
    }

    // bookTutorMutation.mutate(object1);
    // setTimeArray([])
  };

  const PayWithWallet = async () => {
    const tutordetails = await TutorDetails(params.id);
    if(timeArray.size ==0) return toast.error("Pick a date")
    let object1;
    if (tutordetails) {
      object1 = {
        tutor: params.id,
        fees: Array.from(timeArray).length * tutordetails.data.fee,
        timing: {
          date: Array.from(timeArray),
          student: isStudent._id,
          fee: tutordetails.data.fee,
        },
      };
    }
    const response = await bookWithWallet(object1)
    if (response?.status == 200) {
      toast.success("Booking successfull")
    } else {
      toast.error("Booking failed")
    }
  }

  // useEffect(() => {
  //   if (bookTutorMutation.isSuccess) {
  //     refetch();
  //   }
  // }, [bookTutorMutation.isSuccess, refetch]);

  return (
    <>
      <Navbar />

      <div className="w-full bg-blue-50 pt-7">
        <div className="mx-auto max-w-screen-lg grid grid-cols-4 gap-8 p-6 pb-20 shadow-xl shadow-gray-300 bg-white">
          <div className="col-span-2 flex flex-col justify-center">
            <h1 className="text:xl sm:text-3xl font-bold text-blue-900 text-center">
              Book an appointment
            </h1>
            <p className="text-sm sm:text-lg text-blue-900 text-center">
              Get an appointment with our experienced tutors
            </p>
          </div>

          <div className="col-span-2">
            <img className=" sm:h-72 w-full object-cover" src={img} alt="" />
          </div>
        </div>
        <div className="mx-auto max-w-screen-lg grid sm:grid-cols-2 gap-8 p-6 pb-20 mt-10 bg-white">
          <div>
            <p className="font-serif text-xl font-bold text-blue-900">
              Select a date
            </p>
            <div className="border p-4 rounded">
              <Calendar
                onChange={onChange}
                tileDisabled={({ date }) =>
                  !includedDates.some(
                    (includedDate) =>
                      date.toDateString() === includedDate.toDateString()
                  )
                }
                value={value}
                className="my-booking-calendar"
              />
            </div>
          </div>

          <div>
            <p className="font-serif text-xl font-bold text-blue-900">
              Select a time
            </p>
            <div className="grid grid-cols-4 gap-2 lg:max-w-xl">
              {tutorSchedule[value.toLocaleDateString()] &&
                tutorSchedule[value.toLocaleDateString()].map((time:any, index:any) => (
                  <button
                    onClick={() => handleClick(time)}
                    key={index}
                    className="rounded-lg bg-blue-100 px-4 py-2 font-medium text-blue-900 active:scale-95 animated-button"
                  >
                    {time}
                  </button>
                ))}
            </div>

            <div className="mt-5">
              <p className="font-serif text-xl font-bold text-blue-900 mb-2">
                Selected Times
              </p>
              <ul>
                {Array.from(timeArray).map((utcDateString:any, index) => {
                  const [datePart, timePart] = utcDateString.split("T");
                  const [hours, minutes] = timePart.split(":");

                  return (
                    <li key={index}>
                      Date: {datePart}, Time: {hours}:{minutes}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className=" h-60 flex items-center w-80">
              <button
                className="rounded-lg w-full bg-blue-100 px-4 py-2 font-medium text-blue-900 active:scale-95 animated-button"
                onClick={() => handleStripePayment()}
              >
                Pay with Stripe
              </button>
              <button
                className="rounded-lg w-full bg-blue-100 px-4 py-2 font-medium text-blue-900 active:scale-95 animated-button"
                onClick={() => PayWithWallet()}
              >
                Pay with Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookTutor;
