import React from 'react';
import Navbar from '../../components/common/navbar';
import Conversation from '../../components/common/conversation';
import Message from '../../components/common/Message';

const Messenger = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <div className="w-1/4 p-4 border-r border-gray-300">
          <input
            placeholder="Search for friends"
            className="w-full p-2 border-b border-gray-300"
                  />
                 <Conversation/> 
        </div>
        <div className="w-1/2 flex flex-col relative">
          <div className="overflow-y-scroll p-4 flex-grow">
                      {/* chatBoxTop content */}
                      <Message own={true} />
                      <Message own={false} />
          </div>
          <div className="p-4 flex items-center justify-between">
            <textarea
              className="w-3/4 h-24 p-2 border border-gray-300"
              placeholder="write something..."
            ></textarea>
            <button className="w-1/4 h-10 bg-teal-500 text-white rounded">
              Send
            </button>
          </div>
          <span className="absolute top-10 text-5xl text-gray-300 cursor-default">
          
          </span>
        </div>
        <div className="w-1/4 p-4 border-l border-gray-300">
          {/* chatOnline content */}
        </div>
      </div>
    </>
  );
};

export default Messenger;
