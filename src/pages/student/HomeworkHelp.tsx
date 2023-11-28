import React, { useState } from "react";
import Navbar from "../../components/common/navbar";
import StudentSidebar from "../../components/students/StudentSidebar";
import PostQuestions from "../../components/students/PostQuestions";
import ListQuestions from "../../components/students/ListQuestions";

const HomeworkHelp = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <StudentSidebar />
        {toggle ? (
          <ListQuestions toggleFunction={setToggle} />
        ) : (
            <PostQuestions toggleFunction={ setToggle} />
        )}
      </div>
    </div>
  );
};

export default HomeworkHelp;
