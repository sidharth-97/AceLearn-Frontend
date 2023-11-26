import Navbar from "../../components/common/navbar";
import StudentQuestionsView from "../../components/tutors/StudentQuestionsView";
import SolveQuestionsHome from "../../components/tutors/SolveQuestionsHome";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import SolveQuestions from "../../components/tutors/SolveQuestions";

const SolveQuestionsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <TutorSidebar />
              <SolveQuestionsHome/>
        {/* <StudentQuestionsView/> */}
        {/* <SolveQuestions/> */}
      </div>
    </div>
  );
};

export default SolveQuestionsPage