import React, { useState } from "react";
import Messages from "../components/Messages/Messages";
import MessagesForm from "../components/MessagesForm/MessageForm";

const NewMessage = ({ socket }) => {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    socket.on("showSentMessages", (data) => {
      setUser(data);
    });
    return () => socket.off("showSentMessages");
  });

  return (
    <div>
      <MessagesForm socket={socket} user={user} setUser={setUser} />
      <Messages user={user} setUser={setUser} socket={socket} />
    </div>
  );
};

export default NewMessage;
