import { useSelector } from "react-redux";
import avatar from "../../assets/26220662-623f-4697-bd29-b27e3ef7f513fdf.jpg";
import icon from "../../assets/online-lecturing-distance-learning-opportunities-self-education-internet-courses-e-learning-technologies_335657-3279.svg";
import classes from "../../assets/Screenshot 2023-10-24 212602.png";
import Navbar from "../../components/common/navbar";
import TutorSidebar from "../../components/tutors/TutorSidebar";

const TutorProfile = () => {
  const { isTutor } = useSelector((state:any) => state.auth);

  return (
    <>
      <Navbar />

      <div className="flex">
        <TutorSidebar />

        <div className="w-full p-4 bg-9ED0F5">
          <div className="flex bg-white justify-center items-center p-5 rounded-3xl">
            {" "}
            {/* Reduced padding */}
            <div>
              <h2 className="font-semibold text-2xl">
                Welcome {isTutor.name},
              </h2>
              <p className="py-2">
                Thank you for being an essential part of our educational
                journey. Your knowledge and experience will make a positive
                impact on countless lives. Let's embark on this educational
                adventure together and create a brighter future for our
                students.
              </p>
              <p className="py-1 text-base">Member since :</p>
              <p className="text-base">Email verified :</p>
              <p className="py-1 text-base">Mobile verified :</p>
            </div>
            <div>
              <img className="w-128" src={icon} alt="" />
            </div>
          </div>

          <div className="flex flex-row h-24 justify-between mt-3 mx-1">
            <div className="flex flex-row h-28 items-center bg-white text-center font-semibold rounded-3xl p-4">
              <div>
                <img className="h-24" src={classes} alt="" />
              </div>
              <div className="bg-white text-black mx-3">
                <p className="text-2xl">Classes Taken</p>
                <p className="text-xl">5</p>
              </div>
            </div>
            <div className="flex flex-row h-28 items-center bg-white text-center font-semibold rounded-3xl p-4">
              <div>
                <img className="h-24" src={classes} alt="" />
              </div>
              <div className="bg-white text-black mx-3">
                <p className="text-2xl">Classes Taken</p>
                <p className="text-xl">5</p>
              </div>
            </div>
            <div className="flex flex-row h-28 items-center bg-white text-center font-semibold rounded-3xl p-4">
              <div>
                <img className="h-24" src={classes} alt="" />
              </div>
              <div className="bg-white text-black mx-3">
                <p className="text-2xl">Classes Taken</p>
                <p className="text-xl">5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorProfile;
