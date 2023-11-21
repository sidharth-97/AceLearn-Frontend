import React, { useState, useEffect, useRef } from "react";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import Navbar from "../../components/common/navbar";
import Conversation from "../../components/common/conversation";
import { useSelector } from "react-redux";
import Message from "../../components/common/Message";
import {
  tutorConversations,
  getMessages,
  addMessages,
} from "../../api/tutorapi";
import socket from "../../services/socket";
import { useQuery } from "react-query";

const MessengerTutor = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const { isTutor } = useSelector((state) => state.auth);

  const { data: conversations } = useQuery({
    queryFn: () => tutorConversations(isTutor._id),
    // Add isTutor._id as a dependency
    enabled: Boolean(isTutor._id),
  });

  useEffect(() => {
    socket.emit("addUser", isTutor._id);
    socket.on("getUsers", (users) => {
      console.log(users, "socket");
    });
  }, []);

  useEffect(() => {
    const getMessageses = async () => {
      const res = await getMessages(currentChat?._id);
      console.log(res, "messsages response");
      setMessages(res?.data);
    };
    getMessageses();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: isTutor._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member != isTutor._id
    );

    socket.emit("sendMessage", {
      senderId: isTutor._id,
      receiverId,
      text: newMessage,
    });
    const res = await addMessages(message);
    console.log(res);
    setMessages([...messages, res?.data]);
    setNewMessage("");
  };

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <TutorSidebar />
        <div className="w-1/4 p-4 border-gray-300">
          <input
            placeholder="Search for friends"
            className="w-full p-2 border-b border-gray-300"
          />
          {conversations?.data?.map((conv) => (
            <div onClick={() => setCurrentChat(conv)}>
              <Conversation
                key={conv?._id}
                conversation={conv}
                currentUser={isTutor._id}
              />
            </div>
          ))}
        </div>
        <div className="w-1/2 flex flex-col relative">
          <div className="overflow-y-scroll p-4 flex-grow">
            {/* chatBoxTop content */}
            {messages.map((m) => (
              <div ref={scrollRef}>
                <Message message={m} own={m.sender == isTutor._id} />
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
            <button
              type="submit"
              className="w-1/4 h-10 bg-teal-500 text-white rounded"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
          <span className="absolute top-10 text-5xl text-gray-300 cursor-default"></span>
        </div>
      </div>
    </>
  );
};

export default MessengerTutor;
