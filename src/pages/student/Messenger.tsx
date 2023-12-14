import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/common/navbar";
import Conversation from "../../components/common/conversation";
import Message from "../../components/common/Message";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import {
  addMessages,
  getConversations,
  getMesssages,
} from "../../api/studentapi";
import socket from "../../services/socket";
import StudentSidebar from "../../components/students/StudentSidebar";
import send from "../../assets/send-message.png"
import attach from "../../assets/attachment.png"
import { RootState } from "../../store";
import { IoIosArrowBack } from "react-icons/io";

interface CurrentChat {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Messagee {
  conversationId?: string;
  createdAt?: Date|Number;
  sender: string;
  text: string;
  image?: string;
  updatedAt?: string;
  __v?: number;
  _id?: string;
}

interface SelectedUser{
  image: string,
  username: string,
  name: string,
  _id:string
}


const Messenger = () => {
  const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
  const [mobile, setMobile] = useState(false)
  const [viewChat, setViewChat] = useState(true)
  const [desktop,setDesktop]=useState(false)
  const [messages, setMessages] = useState<Messagee[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<Messagee|null>(null);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>();
  const [res, setres] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const { isStudent } = useSelector((state:RootState) => state.auth);
  const { data: conversations,refetch} = useQuery({
    queryFn: () => getConversations(isStudent._id),
    enabled: Boolean(isStudent._id),
  });
console.log(res);


  useEffect(() => {
    socket.emit("addUser", isStudent._id);
    socket.on("getUsers", (users) => {
      console.log(users, "socket");
    });
  }, []);
 
  


  useEffect(() => {
    const getMessages = async () => {
      const res = await getMesssages(currentChat?._id);
 
      setMessages(res?.data);
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append("sender", isStudent._id);


    formData.append("text", newMessage);
    console.log("After appending text:", { ...formData });
    
    if (currentChat) {
      console.log("currentChat._id:", currentChat._id);
      formData.append("conversationId", currentChat._id);
    }
    console.log("After appending conversationId:", { ...formData });
    
    if (image) {
      console.log("image:", image);
      formData.append("image", image);
    }
    console.log("After appending image:", { ...formData });
    

    const receiverId = currentChat?.members.find(
      (member) => member !== isStudent._id
    );
  
   
  
    try {
      const res = await addMessages(formData);
    socket.emit("sendMessage", {
      senderId: isStudent._id,
        receiverId,
      image:res?.data.image,
      text: newMessage,
    });
      setMessages([...messages, res?.data]);
      setNewMessage("");
      setImage(null)
      refetch();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        image:data.image,
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

  const handleConversationClick = (image:any) => {
    // Set the image when a conversation is clicked
    setSelectedUser(image);
  };

  console.log(selectedUser, "---------------------------------");

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true)
      setViewChat(false)
    } else {
      setDesktop(true)
    }
  }, [])
  console.log("mobile,desktop,view chat");
  
console.log(mobile,desktop,viewChat);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-full">
        <StudentSidebar />
     { (!viewChat || desktop)&& <div className={`${mobile?'w-full':'w-1/4'} p-4 border-r border-gray-300`}>
          <input
            placeholder="Search for friends"
            className="w-full p-2 border-b border-gray-300"
          />
          {conversations?.data?.conv?.length &&
            conversations?.data?.conv?.map((conv:CurrentChat) => (
              <div onClick={() => { setCurrentChat(conv); setViewChat(true)}}>
                <Conversation
                  key={conv?._id}
                  conversation={conv}
                  currentUser={isStudent._id}
                  setres={setres}
                  onConversationClick={handleConversationClick}
                  lastMessage={conversations?.data?.messages}                />
              </div>
            ))}
        </div>}


    {(desktop || viewChat) &&<div className={`${mobile?"w-full":"w-1/2 "}flex flex-col relative`}>
          <div className="flex items-center gap-1 p-4">
      {mobile&&    <div className="flex items-center ">
          <button
            onClick={()=> setViewChat(false)}
            className=" text-gray-700 font-bold py-2 px-4 rounded"
          >
                <IoIosArrowBack size={32}/>
          </button>
        </div>}
        <img
          src={selectedUser?.image}
          alt={selectedUser?.username ||selectedUser?.name}
          className="w-12 h-12 rounded-full mr-2"
        />
        <h1 className="text-lg font-semibold">{selectedUser?.name||selectedUser?.username}</h1>
      </div>

      <div className="overflow-y-scroll p-4 flex-grow overflow-x-hidden">
        {/* chatBoxTop content */}
        {messages.map((m:any) => (
          <div ref={scrollRef}>
            <Message
              res={selectedUser}
              message={m}
              own={m.sender == isStudent._id}
            />
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)}
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
    </div>}
        {/* <div className="w-1/4 p-4 border-l border-gray-300">
        
        </div> */}
      </div>
    </div>
  );
};

export default Messenger;
