import React, { useEffect } from "react";
import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import EditProfile from "../../components/students/EditProfile";
import { useQuery } from "react-query";
import { studentDetails } from "../../api/studentapi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import MySkeleton from "../../components/UI/Skeleton";

const EditStudentProfile = () => {
  const navigate = useNavigate();

  const { isStudent } = useSelector((state: any) => state.auth);

  const {
    data: student,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => studentDetails(isStudent._id),
 
  });

  console.log(student?.data);
  if (isError) {
    console.log("error is here");
  }

  return (
    <div className="text-black">
    <Navbar />
    <div className="flex flex-row">
      <StudentSidebar />
      <div className="w-full">
        {isLoading ? (
         <MySkeleton/>
        ) : (
          <div className=" bg-9ED0F5">
            {student && student.data && (
              <EditProfile data={student.data} />
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default EditStudentProfile;
