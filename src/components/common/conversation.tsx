import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { getAllUsers } from "../../api/studentapi";
import { format } from "timeago.js";

const Conversation = ({
  conversation,
  currentUser,
  setres,
  onConversationClick,
  lastMessage,
}) => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("");
  useEffect(() => {
    if (conversation && conversation.members) {
      const othersId = conversation.members.find((m) => m !== currentUser);
      setView(
        lastMessage.find((mess) => mess.conversationId == conversation._id)
      );

      const getUser = async () => {
        try {
          const res1 = await getAllUsers(othersId);
          setUser(res1);
          setres(res1?.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      getUser();
    }
  }, [conversation, currentUser, setres]);

  const handleClick = () => {
    // Pass the image URL to the parent component when conversation is clicked
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
