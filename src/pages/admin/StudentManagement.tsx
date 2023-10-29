import React from 'react'
import AdminSidebar from '../../components/admin/AdminHome'
import Students from '../../components/admin/Students'

const StudentManagement = () => {
  return (
    <section className="flex gap-6">
    <AdminSidebar />
    <div className="m-3 text-xl text-gray-900 font-semibold">
      User Management
      <Students />
    </div>
  </section>
  )
}

export default StudentManagement