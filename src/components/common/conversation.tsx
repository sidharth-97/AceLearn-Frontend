import React, { useState,useEffect} from 'react'
import { useQuery } from 'react-query'

import {getAllUsers } from '../../api/studentapi'

const Conversation = ({ conversation,currentUser }) => {
    const [user, setUser] = useState(null)

    
    useEffect(() => {
      if (conversation && conversation.members) {
        const othersId = conversation.members.find((m) => m !== currentUser);
        console.log(othersId, "othersid");
  
        const getUser = async () => {
          try {
            const res1 = await getAllUsers(othersId);
            setUser(res1);
            console.log(res1, "this is the response 111");
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
  
        getUser();
      }
  
    }, [conversation, currentUser]);
  
    

  return (
    <div className="flex items-center p-4 cursor-pointer mt-10 conversation hover:bg-gray-100">
  <img
    className="w-9 h-9 rounded-full object-cover mr-5"
    src={user?.data?.image}
    alt=""
  />
      <span className="font-semibold conversationName">
  {user?.data.username ? user?.data.username : user?.data.name}
</span>

</div>

  )
}

export default Conversation