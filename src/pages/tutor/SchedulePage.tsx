import React from 'react'
import Navbar from '../../components/common/navbar'
import TutorSidebar from '../../components/tutors/TutorSidebar'
import TutorSchedule from '../../components/tutors/TutorSchedule'

const TutorSchedulePage = () => {
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <TutorSidebar />
        <TutorSchedule/>
      </div>
    </div>
  )
}

export default TutorSchedulePage