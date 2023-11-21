import React, { useState,useEffect} from 'react'
import { useQuery } from 'react-query'

import {getAllUsers } from '../../api/studentapi'

const Conversation = ({ conversation,currentUser }) => {
    const [user, setUser] = useState(null)

    
  useEffect(() => {
      
      const othersId = conversation.members.find((m) => m != currentUser)
    console.log(othersId, "othersid");
    console.log(conversation.members, "members");
    console.log(currentUser);
    
    
      
        const getUser = async () => {
          const res1 = await getAllUsers(othersId)
          setUser(res1)
          console.log(res1,"this is the resopone 111");
          
        }
        getUser()

    }, [conversation,currentUser])
    

  return (
    <div className="flex items-center p-4 cursor-pointer mt-10 conversation hover:bg-gray-100">
  <img
    className="w-9 h-9 rounded-full object-cover mr-5"
    src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    alt=""
  />
      <span className="font-semibold conversationName">
  {user?.data.username ? user?.data.username : user?.data.name}
</span>

</div>

  )
}

export default Conversation