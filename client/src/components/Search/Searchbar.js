import React, { useEffect, useState } from "react";
import { AutoComplete, Input } from "antd";
import Cookies from "universal-cookie";

const searchResult = (data) =>
  data.map((user) => ({ value: `${user.username}` }));

const Searchbar = ({ recipient, setRecipient, socket, setUser }) => {
  const [options, setOptions] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    socket.on("getAllUsers", (data) => {
      setOptions(data ? searchResult(data) : []);
    });
    socket.on("showSentMessages", (data) => {
      setUser(data);
    });
    return () => {
      socket.off("getAllUsers");
      socket.off("findUser");
    };
  });

  const handleSearch = (value) => {
    socket.emit("getAllUsers", value);
    socket.emit("showSentMessages", value, cookies.get("username_task7"));
  };

  const onSelect = (value) => {
    socket.emit("showSentMessages", value, cookies.get("username_task7"));
    setRecipient(value);
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      options={options}
      onSelect={onSelect}
      autoFocus={true}
      status="error"
      onSearch={handleSearch}
    >
      <Input.Search
        size="large"
        required={true}
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="enter recipient name"
        enterButton
      />
    </AutoComplete>
  );
};
export default Searchbar;
