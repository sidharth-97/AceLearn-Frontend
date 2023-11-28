import React from "react";
import AdminSidebar from "../../components/admin/AdminHome";
import Students from "../../components/admin/Students";
import { useQuery } from "react-query";
import { userCount } from "../../api/adminapi";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdWorkspacePremium } from "react-icons/md";
import SubjectsBarchart from "../../components/admin/SubjectsBarchart";
import PieCharts from "../../components/admin/PieChart";

const AdminDash = () => {
  const { data } = useQuery({
    queryFn: () => userCount(),
  });
  console.log(data?.data,"from dashbosard");

  
  return (
    <>
       <section className="flex gap-6 bg-gray-200">
      <AdminSidebar />
      <div className="text-xl text-gray-900 font-semibold bg-gray-200 w-full">
        <h1 className=" text-lg font-semibold">Welcome Admin,</h1>
        <ul className="box-info grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="p-4 bg-white rounded-lg flex items-center shadow-md hover:shadow-lg transition duration-300">
            <span className="text flex items-center">
              <PiStudentFill />
              <div>
                <p className="text-sm text-gray-600">Students</p>{" "}
                <h3 className="text-lg font-bold">{data?.data.studentCount}</h3>
              </div>
            </span>
            <i className="bx bxs-calendar-check text-4xl ml-4 text-gray-700"></i>
          </li>

          <li className="p-4 bg-white rounded-lg flex items-center">
            <i className="bx bxs-group text-4xl"></i>
            <span className="text ml-4 flex">
              <GiTeacher />
              <div>
                <p>Tutors</p>{" "}
                <h3 className="text-xl font-bold">{data?.data.tutorCount}</h3>
              </div>
            </span>
          </li>
          <li className="p-4 bg-white rounded-lg flex items-center">
            <i className="bx bxs-dollar-circle text-4xl"></i>
            <span className="text ml-4 flex">
              <MdWorkspacePremium />
              <div>
                <p>Premium Users</p>{" "}
                <h3 className="text-xl font-bold">{data?.data.premiumCount}</h3>
              </div>
            </span>
          </li>
        </ul>  <div>
            {data?.data && <SubjectsBarchart data={data?.data.subjectsAndCounts} />}
            
{data?.data && (
  <PieCharts
    data={[
      { category: "Premium", value: data?.data.premiumCount },
      { category: "Non Premium", value: (data?.data.tutorCount + data?.data.studentCount) - data?.data.premiumCount }
    ]}
  />
)}


      </div>
      </div>
      </section>
    
    </>
   

  );
};

export default AdminDash;
