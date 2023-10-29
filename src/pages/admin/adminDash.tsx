import React from "react";
import AdminSidebar from "../../components/admin/AdminHome";
import Students from "../../components/admin/Students";

const AdminDash = () => {
  return (
    <section className="flex gap-6">
      <AdminSidebar />
      <div className="m-3 text-xl text-gray-900 font-semibold">
       <h1 className=" text-lg font-semibold">Welcome Admin,</h1>
     
      </div>
    </section>
  );
};

export default AdminDash;
