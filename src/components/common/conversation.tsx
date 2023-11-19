import React, { useState,useEffect} from 'react'
import { useQuery } from 'react-query'
import { studentDetails } from '../../api/studentapi'

const Conversation = ({ conversation,currentUser }) => {
    const [user, setUser] = useState(null)

    
    useEffect(() => {
        const othersId = conversation.members.find((m) => m != currentUser._id)
        const getUser = async () => {
            const res = await studentDetails(othersId)
            console.log(res,"res");
            setUser(res)
        }
        getUser()

    }, [conversation,currentUser])
    

  return (
    <div className="flex items-center p-10 cursor-pointer mt-20 conversation hover:bg-gray-100">
  <img
    className="w-9 h-9 rounded-full object-cover mr-5"
    src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    alt=""
  />
          <span className="font-semibold conversationName">{user?.data.username}</span>
</div>

  )
}

export default Conversation