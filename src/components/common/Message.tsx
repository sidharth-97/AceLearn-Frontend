import React from 'react'
import {format} from 'timeago.js'

const Message = ({ message, own, res }) => { 
  function isFile(url) {
    // Check if the URL ends with .pdf (case-insensitive)
    return /\.(pdf)$/i.test(url);
  }
  return (
      // Assuming you have 'own', 'message', and 'format' as props or state in your React component
     
<div className={`${own ? 'flex flex-col items-end' : 'flex flex-col'} mt-5 message`}>
  <div className="flex flex-col messageTop">
    {/* { !own && <img
      className="w-9 h-9 rounded-full object-cover mr-3"
      src={res?.image}
      alt=""
    />} */}
    {message.text.length > 0 && (
      <p className={`${!own ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'} p-3 rounded-2xl max-w-[300px]`}>
        {message.text}
      </p>
    )}

    {message.image && (
      <div>
        {isFile(message.image) ? (
          <a href={message.image} download>
            Download File
          </a>
        ) : (
          <a href={message.image} target="_blank" rel="noopener noreferrer">
            <img className={`${!own ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'} p-1 rounded-2xl w-1/2`} src={message.image} alt="Message Image" />
          </a>
        )}
      </div>
    )}
  </div>
  <div className="text-xs mt-3 messageBottom">{format(message.createdAt)}</div>
</div>



  )
}

export default Message