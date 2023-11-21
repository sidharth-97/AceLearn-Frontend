import React from 'react'
import TutorSidebar from '../../components/tutors/TutorSidebar'

const MessengerTutor = () => {
  return (
      <>
          <div className='flex h-screen'>
              <TutorSidebar />
              <div className='w-1/4 p-4 border-gray-300'>
                  conversation
              </div>
              <div className='w-1/2 flex-col relative'>
                  messages
              </div>
      </div>
      </>
  )
}

export default MessengerTutor