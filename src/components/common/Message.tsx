import { format } from "timeago.js";

interface Mesg {
  conversationId: string;
  text: string;
  createdAt: Date;
  image: string;
}

// interface User {
//   data: {
//     image: string;
//     name?: string;
//     username?: string;
//   };
// }

interface Message {
  message: Mesg;
  own: boolean;
  res: any;
}

const Message: React.FC<Message> = ({ message, own, res }) => {
  console.log("Inside the message +++++++++++++++++++++++");

  console.log(message, "message");
  console.log(own, "own");
  console.log(res, "res");

  function isFile(url: any) {
    return /\.(pdf)$/i.test(url);
  }
  return (
    <div
      className={`${
        own ? "flex flex-col items-end" : "flex flex-col"
      } mt-5 message`}
    >
      <div className="flex flex-col messageTop">
        {/* { !own && <img
      className="w-9 h-9 rounded-full object-cover mr-3"
      src={res?.image}
      alt=""
    />} */}
        {message.text.length > 0 && (
          <p
            className={`${
              !own ? "bg-gray-200 text-black" : "bg-blue-500 text-white"
            } p-3 rounded-2xl max-w-[300px]`}
          >
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
                <img
                  className={`${
                    !own ? "bg-gray-200 text-black" : "bg-blue-500 text-white"
                  } p-1 rounded-2xl w-1/2`}
                  src={message.image}
                  alt="Message Image"
                />
              </a>
            )}
          </div>
        )}
      </div>
      <div className="text-xs mt-3 messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
