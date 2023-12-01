import React from 'react'
import {format} from 'timeago.js'

const Message = ({ message, own, res }) => { 
  console.log(res,"......................................");
  
  return (
      // Assuming you have 'own', 'message', and 'format' as props or state in your React component
     
<div className={`${own ? 'flex flex-col items-end' : 'flex flex-col'} mt-5 message`}>
  <div className="flex messageTop">
   {/* { !own&&<img
      className="w-9 h-9 rounded-full object-cover mr9-10"
      src={res?.image}
      alt=""
    />} */}
    <p className={`${!own ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'} p-3 rounded-2xl max-w-[300px]`}>
      {message.text}
    </p>
  </div>
  <div className="text-xs mt-3 messageBottom">{format(message.createdAt)}</div>
</div>


  )
}

export default Message