import React, { useState } from "react";
import Navbar from "../../components/common/navbar";
import StudentSidebar from "../../components/students/StudentSidebar";
import PostQuestions from "../../components/students/PostQuestions";
import ListQuestions from "../../components/students/ListQuestions";
import { useSelector } from "react-redux";
import PremiumMessage from "../../components/common/PremiumMessage";

const HomeworkHelp = () => {
  const [toggle, setToggle] = useState(true);
const{isStudent}=useSelector((state)=>state.auth)
  return (
    <div>
      <Navbar />
      <div className="flex">
        <StudentSidebar />
        {isStudent.premium ?(toggle ? (
          <ListQuestions toggleFunction={setToggle} />
        ) : (
            <PostQuestions toggleFunction={ setToggle} />
        )):<div className="w-full"><PremiumMessage/></div>}
      </div>
    </div>
  );
};

export default HomeworkHelp;
