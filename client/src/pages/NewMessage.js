import React from "react";
import Messages from "../components/Messages/Messages";
import MessagesForm from "../components/MessagesForm/MessageForm";

const NewMessage = () => {
  return (
    <div>
      <MessagesForm />
      <Messages />
    </div>
  );
};

export default NewMessage;
