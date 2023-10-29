import React from "react";
import StudentSidebar from "../../components/students/StudentSidebar";
import Navbar from "../../components/common/navbar";
import EditProfile from "../../components/students/EditProfile";
import { useQuery } from "react-query";
import { studentDetails } from "../../api/studentapi";
import { useSelector } from "react-redux";

const EditStudentProfile = () => {

const {isStudent}=useSelector((state:any)=>state.auth)

  const { data:student, isLoading, isError } = useQuery({
    queryFn: () => studentDetails(isStudent._id),
    queryKey:['data']
  });

console.log(student?.data);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <div className="loader"></div>
</div>

    )
  }

  if (isError) {
    return ;
  }
  return (
    <div className="text-black bg-9ED0F5">
      <Navbar />
      <div className="flex flex-row">
        <StudentSidebar />
        <div className="w-full">
          <EditProfile data={ student?.data} />
        </div>
      </div>
    </div>
  );
};

export default EditStudentProfile;
