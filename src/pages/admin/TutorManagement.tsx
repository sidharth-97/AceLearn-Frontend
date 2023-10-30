import React from 'react'
import AdminSidebar from '../../components/admin/AdminHome'
import Tutors from '../../components/admin/Tutors'

const TutorManagement = () => {
  return (
    <section className="flex gap-6">
    <AdminSidebar />
    <div className="m-3 text-xl text-gray-900 font-semibold">
      Tutor Management
      <Tutors/>
    </div>
  </section>
  )
}

export default TutorManagement