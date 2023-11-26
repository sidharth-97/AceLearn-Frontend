import React from 'react'
import Navbar from '../../components/common/navbar'
import StudentSidebar from '../../components/students/StudentSidebar'
import PostQuestions from '../../components/students/PostQuestions'
import ListQuestions from '../../components/students/ListQuestions'


const HomeworkHelp = () => {
  return (
      <div>
          <Navbar/>
          <div className='flex'>
              <StudentSidebar />
              {/* <ListQuestions/> */}
              <PostQuestions/>
          </div>
          
    </div>
  )
}

export default HomeworkHelp