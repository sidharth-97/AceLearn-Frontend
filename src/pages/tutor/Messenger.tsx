import  { useState, useEffect, useRef } from "react";
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
import send from "../../assets/send-message.png"
import attach from '../../assets/attachment.png'
import { RootState } from "../../store";

const MessengerTutor = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [ setres] = useState("");
  const [image, setImage] = useState<File | null>(null); 
  const scrollRef = useRef();
  const { isTutor } = useSelector((state:RootState) => state.auth);

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
    const formData = new FormData()
    formData.append("sender", isTutor._id)
    formData.append("text", newMessage)
    formData.append("conversationId",currentChat._id)
    // const message = {
    //   sender: isTutor._id,
    //   text: newMessage,
    //   conversationId: currentChat._id,
    // };
    if (image) {
      console.log("image:", image);
      formData.append("image", image);
    }
    const receiverId = currentChat.members.find(
      (member) => member != isTutor._id
    );

    
    const res = await addMessages(formData);
    console.log(res);
    socket.emit("sendMessage", {
      senderId: isTutor._id,
      receiverId,
      image:res?.data.image,
      text: newMessage,
    });
    setMessages([...messages, res?.data]);
    setNewMessage("");
setImage(null)
  };

  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log("Received message with image:", data.image);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        image:data.image,
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

  const handleConversationClick = (image) => {
    // Set the image when a conversation is clicked
    setSelectedUser(image);
  };


  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-full">
        <TutorSidebar />
        <div className="w-1/4 p-4 border-r border-gray-300">
          <input
            placeholder="Search for friends"
            className="w-full p-2 border-b border-gray-300"
          />
          {conversations?.data?.conv?.length &&
            conversations?.data?.conv?.map((conv) => (
            <div onClick={() => setCurrentChat(conv)}>
              <Conversation
                key={conv?._id}
                conversation={conv}
                  currentUser={isTutor._id}
                  setres={setres}
                  onConversationClick={handleConversationClick}
                  lastMessage={conversations?.data?.messages} 
              />
            </div>
          ))}
        </div>
        <div className="w-1/2 flex flex-col relative">
        <div className="flex items-center gap-1 p-4">
            <img
              src={selectedUser?.image}
              alt={selectedUser?.name}
              className="w-12 h-12 rounded-full mr-2"
            />
            <h1 className="text-lg font-semibold">{selectedUser?.username}</h1>
          </div>
          <div className="overflow-y-scroll p-4 flex-grow">
            {/* chatBoxTop content */}
            {messages.map((m) => (
              <div ref={scrollRef}>
                <Message res={selectedUser} message={m} own={m.sender == isTutor._id} />
              </div>
            ))}
          </div>
          <div className="p-4 flex items-center">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="w-full flex items-center"
            >
              <textarea
                className="w-full h-16 p-2 border border-gray-300 mr-4"
                placeholder="write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                name="text"
              ></textarea>{" "}
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  name="image"
                  className="hidden"
                />
                {image && (
                  <img
                    className="object-cover h-16 ms-1"
                    src={""}
                    alt="Selected Image"
                  />
                )}
                {!image && (
                  <img
                    className="object-cover h-16 ms-1"
                    src={attach}
                    alt="Send Icon"
                  />
                )}
              </label>
              <button type="submit">
                <img
                  className="object-cover h-16 ms-1"
                  src={send}
                  alt="Send Icon"
                />
              </button>
            </form>
          </div>
          <span className="absolute top-10 text-5xl text-gray-300 cursor-default"></span>
        </div>
      </div>
    </div>
  );
};

export default MessengerTutor;
