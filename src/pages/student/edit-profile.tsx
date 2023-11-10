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

  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       {/* <div className="loader"></div> */}
  //       <div>
  //         <SkeletonTheme baseColor="#202020" highlightColor="#444">
  //           <Skeleton count={5} />
  //         </SkeletonTheme>
  //       </div>
  //     </div>
  //   );
  // }
  if (isError) {
    console.log("error is here");
  }

  // useEffect(() => {
  //   if (isError) {
  //       navigate('/student/login');
  //   }
  // }, [isError, navigate]);

  return (
    <div className="text-black bg-9ED0F5">
    <Navbar />
    <div className="flex flex-row">
      <StudentSidebar />
      <div className="w-full">
        {isLoading ? (
         <MySkeleton/>
        ) : (
          <div>
            {student && student.data && ( // Checking if student and student.data are available
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
