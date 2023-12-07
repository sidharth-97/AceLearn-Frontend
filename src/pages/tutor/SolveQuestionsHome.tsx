import Navbar from "../../components/common/navbar";
import StudentQuestionsView from "../../components/tutors/StudentQuestionsView";
import SolveQuestionsHome from "../../components/tutors/SolveQuestionsHome";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import { useState } from "react";

const SolveQuestionsPage = () => {
  const [toggle,setToggle]=useState(false)
  return (
    <div>
      <Navbar />
      <div className="flex">
        <TutorSidebar />
        
        {
          toggle ? <StudentQuestionsView toggler={setToggle} />:<SolveQuestionsHome toggler={setToggle} />
        }
        
        {/* <SolveQuestions/> */}
      </div>
    </div>
  );
};

export default SolveQuestionsPage