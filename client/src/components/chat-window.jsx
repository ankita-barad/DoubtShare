/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { socket } from "../socket.js";

export const ChatWindow = ({ userId, doubtId, previousChats = [] }) => {
  const [chat, setChat] = useState(previousChats);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (newMessage) => {
      console.log("got a message from server", newMessage);
      setChat([newMessage, ...chat]);
    });
  }, [chat]);

  const onSend = () => {
    if (!message) return;

    socket.emit("new_message", {
      message,
      userId: userId,
      doubtId,
    });

    setMessage("");
  };

  return (
    <>
      {/* Chat messages */}
      <div className="flex flex-col-reverse h-[500px] overflow-auto ">
        {chat.map((message) => (
          <div
            key={message.id}
            className={`text-xs ${
              message.user.id === userId
                ? "mr-auto text-left"
                : "ml-auto text-right"
            }`}
          >
            <div className="mb-1">{message.user.name}</div>
            <div
              className={`${
                message.user.id === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              } p-2 mb-2 rounded-md max-w-md`}
            >
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-md"
        />
        <button
          onClick={onSend}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </>
  );
};
