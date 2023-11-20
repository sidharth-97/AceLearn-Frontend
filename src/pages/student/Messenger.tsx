import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/common/navbar";
import Conversation from "../../components/common/conversation";
import Message from "../../components/common/Message";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { addMessages, getConversations, getMesssages } from "../../api/studentapi";

const Messenger = () => {
    const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState([])
  const scrollRef=useRef()
  const { isStudent } = useSelector((state) => state.auth);
  const { data: conversations } = useQuery({
    queryFn: () => getConversations(isStudent._id),
    // Add isStudent._id as a dependency
    enabled: Boolean(isStudent._id),
  });

  console.log(conversations, "conv");
  console.log(currentChat, "curr chat");
  
  useEffect(() => {
    const getMessages = async () => {
      const res = await getMesssages(currentChat?._id)
      console.log(res, "messsages respojse");
      setMessages(res?.data)
    }
    getMessages()
  }, [currentChat])
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const message = {
      sender: isStudent._id,
      text: newMessage,
      conversationId:currentChat._id
    }
    const res = await addMessages(message)
    console.log(res);
    setMessages([...message,res?.data])
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <div className="w-1/4 p-4 border-r border-gray-300">
          <input
            placeholder="Search for friends"
            className="w-full p-2 border-b border-gray-300"
          />
          {conversations?.data?.map((conv) => (
              <div onClick={()=>setCurrentChat(conv)}>
                    <Conversation
              key={conv?._id}
              conversation={conv}
              currentUser={isStudent._id}
            />
          </div>
          ))}
        </div>
        <div className="w-1/2 flex flex-col relative">
          <div className="overflow-y-scroll p-4 flex-grow">
            {/* chatBoxTop content */}
            {messages.map((m) => (
              <div ref={scrollRef}>
                              <Message message={m} own={m.sender ==isStudent._id} />

              </div>
            ))}
          </div>
          <div className="p-4 flex items-center justify-between">
            <textarea
              className="w-3/4 h-24 p-2 border border-gray-300"
              placeholder="write something..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button type="submit" className="w-1/4 h-10 bg-teal-500 text-white rounded" onClick={handleSubmit}>
              Send
            </button>
          </div>
          <span className="absolute top-10 text-5xl text-gray-300 cursor-default"></span>
        </div>
        <div className="w-1/4 p-4 border-l border-gray-300">
          {/* chatOnline content */}
        </div>
      </div>
    </>
  );
};

export default Messenger;
