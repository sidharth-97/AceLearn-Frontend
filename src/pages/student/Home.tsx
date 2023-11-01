import Navbar from "../../components/common/navbar";
import homeIcon from "../../assets/svgexport-1.svg";
import icon1 from "../../assets/26220662-623f-4697-bd29-b27e3ef7f513hth.jpg";
import icon2 from "../../assets/26220662-623f-4697-bd29-b27e3ef7f513fdf.jpg";
import icon3 from "../../assets/6fsfsdfsf.jpg";
import icon4 from "../../assets/26220662-623f-4697-bd29-b27e3ef7f513.jpg";
import icon5 from "../../assets/clipart2614421.png"
import { Link } from "react-router-dom";
import TutorsCards from "../../components/common/TutorsCards";

function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-9ED0F5">
        <div className="max-w-[50%] text-center md:text-left p-4 md:p-0">
          <h1 className="text-6xl">Take the first step</h1>
          <h1 className="text-6xl">to Learn with us</h1>
          <p className="mt-3">
            This is a cutting-edge private tutor platform designed to connect
            eager learners with experienced and passionate tutors in a safe and
            dynamic online environment.
          </p>
          <button
            type="button"
            className="mt-3 inline-block rounded bg-3447AE px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-3447AE-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-3447AE-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-3447AE-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <Link to={'/student/signup'}>Join as Student</Link>
          </button>
        </div>
        <div>
          <img src={homeIcon} alt="Home Icon" />
        </div>
      </div>

      {/* top */}
      <h1 className="text-4xl font-bold text-center mt-7">WHAT WE OFFER</h1>
      <div className="p-4 flex items-center justify-center">
        <div className="flex flex-col">
          <div className="flex-1 flex">
            <div className="flex items-center p-4 m-2 rounded-lg">
              <img
                src={icon1}
                alt="Image Description"
                className="w-1/4 max-h-36 mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">Online Tutoring</h2>
                <p>Book one-on-one sessions with our tutors</p>
              </div>
            </div>
            <div className="flex items-center p-4 m-2 rounded-lg">
              <img
                src={icon2}
                alt="Image Description"
                className="w-1/4 max-h-36 mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">Study Materials</h2>
                <p>You can access free study materials from our tutors</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex">
            <div className="flex items-center p-4 m-2 rounded-lg">
              <img
                src={icon3}
                alt="Image Description"
                className="w-1/4 max-h-36 mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">Homework Help</h2>
                <p>You can post your doubts or assignment questions.</p>
                <p>our experts will solve that to you.</p>
              </div>
            </div>
            <div className="flex items-center p-4 m-2 rounded-lg">
              <img
                src={icon4}
                alt="Image Description"
                className="w-1/4 max-h-36 mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">Mentoring</h2>
                <p>Feel free to chat with your mentor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
<TutorsCards/>
      {/* next section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-7">Pricing Plans</h1>
        <p className="mt-5">
          Whether you're looking for the best tutor in the country, or you just
          need some occasional help online - we've got a plan for you.
        </p>
      </div>
      <div className="p-4 mt-2">
        <div className="flex flex-wrap -mx-4 justify-start items-center">
          <div className="w-full md:w-1/2 px-4 mb-8 flex justify-end pre">
          <div className="w-full md:max-w-sm min-h-96 relative border-2 border-blue-500 rounded-lg shadow-md">
        <img
          src="https://uploads-ssl.webflow.com/5e6c62141489070e82c24bcf/63d7c1e6e00e4c33a581f2ae_woman-teacher_1f469-200d-1f3eb.png"
          alt="Top Image"
          className="absolute top-0 w-full h-10 object-contain"
        />
        <div className="p-4 mt-2">
              <h2 className="text-xl font-bold mb-2 mt-4 ">Student Premium</h2>
              <ul className="list-disc pl-4 mb-4">
                <li>Can join unlimited classes.</li>
                <li>Can post unlimited questions.</li>
              </ul>
              <p>$10/month</p>
              <div className="mt-4 flex justify-start">
                <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                  Subscribe
                </button>
              </div>
              </div>
              </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-8 flex">
          <div className="w-full md:max-w-sm min-h-96 border-2 border-yellow-500 rounded-lg shadow-md relative">
  <img
    src="https://uploads-ssl.webflow.com/5e6c62141489070e82c24bcf/63d7c1e68c4fb44b56d192b2_student_1f9d1-200d-1f393.png"
    alt="Top Image"
    className="absolute top-0 w-full h-10 object-contain"
  />
              <div className="p-4 mt-2">
                <h2 className="text-xl font-bold mb-2 mt-4">Tutor Premium</h2>
                <ul className="list-disc pl-4 mb-4">
                  <li>
                    Premium tutors can take unlimited classes (limited to 3 per
                    month for normal tutors).
                  </li>
                  <li>
                    Can solve 15 questions per month; otherwise, 5 per month.
                  </li>
                </ul>
                <p>$20/month</p>
                <div className="mt-4 flex justify-start">
                  <button className="bg-yellow-500 text-white py-2 px-4 rounded">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
