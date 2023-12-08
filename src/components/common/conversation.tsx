import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/studentapi";
import { format } from "timeago.js";

interface Message {
  conversationId: string;
  text: string;
  createdAt:Date
}

interface CurrentChat {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Conversation{
  conversation: CurrentChat,
  currentUser: string,
  setres: React.Dispatch<React.SetStateAction<any>>;
  onConversationClick: any;
  lastMessage: Message[];
}

interface User{
  data: {
    image: string,
    name?: string,
    username?:string
  }
}

const Conversation:React.FC<Conversation>= ({
  conversation,
  currentUser,
  setres,
  onConversationClick,
  lastMessage,
}) => {
  
  const [user, setUser] = useState<User|null>(null);
  const [view, setView] = useState<Message | null|undefined>(null);

  useEffect(() => {
    if (conversation && conversation.members) {
      const othersId = conversation.members.find((m:string) => m !== currentUser);
      setView(
        lastMessage.find((mess) => mess.conversationId == conversation._id)
      );

      const getUser = async () => {
        try {
          const res1 = await getAllUsers(othersId as string);
          setUser(res1||null);
          setres(res1?.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      getUser();
    }
  }, [conversation, currentUser, setres]);

  const handleClick = () => {
    onConversationClick(user?.data);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex items-center w-full p-4 cursor-pointer mt-1 conversation border-b border-gray-200 hover:bg-gray-100"
      >
        <div className="flex items-center w-full">
          <img
            className="w-12 h-12 rounded-full object-cover mr-5"
            src={user?.data?.image}
            alt=""
          />

          <div className="flex flex-col w-full">
            <span className="font-semibold conversationName flex justify-between">
              <div>
                {user?.data.username ? user?.data.username : user?.data.name}
              </div>
              <div className="text-gray-400 text-xs"> {view && format(view?.createdAt)}</div>
            </span>
            {view && view?.text.length > 20
              ? `${view?.text.slice(0, 20)}......`
              : view?.text}
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
