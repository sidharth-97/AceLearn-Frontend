import React from 'react'
import StudentSidebar from '../../components/students/StudentSidebar'
import Navbar from '../../components/common/navbar'
import EditProfile from '../../components/students/EditProfile'

const EditStudentProfile = () => {
  return (
      <div className='text-black bg-9ED0F5'>
      <Navbar />
      <div className='flex flex-row'>
<StudentSidebar/>
       
    <div className='w-full'><EditProfile/></div>
      </div>
    </div>
  )
}

export default EditStudentProfile