import AdminSidebar from "../../components/admin/AdminHome";
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
  console.log(data?.data, "from dashbosard");

  return (
    <>
      <section className="flex gap-6 bg-gray-200">
        <AdminSidebar />
        <div className="text-xl text-gray-900 font-semibold bg-gray-200 w-full mt-5">
          <h1 className=" text-2lg font-semibold m-4">Welcome Admin,</h1>
          <ul className="box-info grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <li className="p-4 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
              <span className="text flex items-center">
                <PiStudentFill style={{ fontSize: "2em" }} />
                <div className="flex flex-col items-center">
                  {" "}
                  <p className="text-lm text-gray-600">Students</p>
                  <h3 className="text-lg font-bold">
                    {data?.data.studentCount}
                  </h3>
                </div>
              </span>
              <i className="bx bxs-calendar-check text-5xl ml-4 text-gray-700"></i>{" "}
            </li>

            <li className="p-4 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
              <span className="text flex items-center">
                <GiTeacher style={{ fontSize: "2em" }} />
                <div className="flex flex-col items-center">
                  {" "}
                  <p className="text-lm text-gray-600">Teachers</p>
                  <h3 className="text-lg font-bold">
                    {data?.data.studentCount}
                  </h3>
                </div>
              </span>
              <i className="bx bxs-calendar-check text-5xl ml-4 text-gray-700"></i>{" "}
            </li>
            <li className="p-4 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
              <span className="text flex items-center">
                <MdWorkspacePremium style={{ fontSize: "2em" }} />
                <div className="flex flex-col items-center">
                  {" "}
                  <p className="text-lm text-gray-600">Premium</p>
                  <h3 className="text-lg font-bold">
                    {data?.data.studentCount}
                  </h3>
                </div>
              </span>
              <i className="bx bxs-calendar-check text-5xl ml-4 text-gray-700"></i>{" "}
            </li>
          </ul>{" "}
          <div className="mt-4 bg-white pt-5 flex">
            <div className="mt-2 gap-2">
              <h1 className="ms-2">Subject wise Teachers</h1>
            {data?.data.subjectsAndCounts && (
              <SubjectsBarchart data={data?.data.subjectsAndCounts} />
            )}
           </div>

            <div>
              <h1 className="ms-5">Premium/Non premium</h1>
            {data?.data && (
              <PieCharts
                data={[
                  { category: "Premium", value: data?.data.premiumCount },
                  {
                    category: "Non Premium",
                    value:
                      data?.data.tutorCount +
                      data?.data.studentCount -
                      data?.data.premiumCount,
                  },
                ]}
              />
            )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDash;
