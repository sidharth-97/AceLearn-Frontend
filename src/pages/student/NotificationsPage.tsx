import React from 'react'
import StudentSidebar from '../../components/students/StudentSidebar'
import Navbar from '../../components/common/navbar'
import Notifications from '../../components/students/Notifications'
import { useQuery } from 'react-query'
import { showNotifications } from '../../api/studentapi'
import { useSelector } from 'react-redux'

const NotificationsPage = () => {

  
    return (
        <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className='flex flex-grow'>
          <StudentSidebar />
          <div className='flex flex-grow justify-center items-center bg-[#F4F7FF]'>
            <div className='bg-white p-10'>
              <h1 className='text-2xl font-bold text-center bg-gray-200 rounded-md p-2'>Notifications</h1>
              <Notifications />
            </div>
          </div>
        </div>
      </div>
  )
}

export default NotificationsPage