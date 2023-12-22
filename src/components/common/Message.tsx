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
    <>
      <div
        className={`flex w-full mt-2 space-x-3 max-w-xs${
          own ? "ml-auto justify-end" : ""
        }`}
      >
        <div>
          <div
            className={`bg-${
              own
                ? "blue-600 text-white rounded-l-lg rounded-br-lg"
                : "gray-300 text-black rounded-r-lg rounded-bl-lg"
            } p-3`}
            style={{ whiteSpace: "pre-wrap" }}
          >
            <p className={`text-sm ${own && "text-right"}`}>{message.text}</p>
          </div>

          <span className="text-xs text-gray-500 leading-none">
            {format(message.createdAt)}
          </span>
        </div>
      </div>
      {message.image && (
        <div
          className={`flex w-full mt-2 space-x-3 max-w-xs ${
            own ? "ml-auto justify-end" : ""
          }`}
        >
          {isFile(message.image) ? (
            <a href={message.image} download>
              Download File
            </a>
          ) : (
            <a href={message.image} target="_blank" rel="noopener noreferrer">
              <img
                className={`${
                  own ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                } p-1 rounded-2xl w-1/2`}
                src={message.image}
                alt="Message Image"
              />
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default Message;
