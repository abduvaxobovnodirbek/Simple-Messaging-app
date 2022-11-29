import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {
  errorNotification,
  successNotification,
} from "../../Helpers/notification";
import Searchbar from "../Search/Searchbar";

const MessagesForm = ({ socket, user, setUser }) => {
  const [recipient, setRecipient] = useState(null);
  const [saved, setSaved] = useState(false);

  const cookies = new Cookies();

  useEffect(() => {
    socket.on("create_message_error", (err) => {
      if (err) {
        errorNotification("bottomRight", "no user found with this username");
      }
    });
    socket.on("created_success", (canBeSaved) => {
      if (canBeSaved) {
        setSaved(true);
      }
    });
    return () => {
      socket.off("create_message_error");
      socket.off("created_success");
    };
  });

  useEffect(() => {
    if (saved) {
      socket.emit("showSentMessages", recipient, cookies.get("username_task7"));
      setSaved(false);
      successNotification("bottomRight", "Successfully has been sent");
    }
  }, [saved]);

  const onFinish = async (values) => {
    const message = {
      ...values,
      recipient: recipient,
      user: user?._id,
      from: cookies.get("username_task7"),
    };
    await socket.emit("create_message", message);
    await socket.emit(
      "showSentMessages",
      recipient,
      cookies.get("username_task7")
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="wrap"
      labelCol={{
        flex: "110px",
      }}
      labelAlign="left"
      labelWrap
      wrapperCol={{
        flex: 1,
      }}
      colon={false}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Recipient" name="recipient">
        <Searchbar
          recipient={recipient}
          setRecipient={setRecipient}
          socket={socket}
          setUser={setUser}
        />
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Title field is required!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Message"
        name="body"
        rules={[
          {
            required: true,
            message: "Message field is required!",
          },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item label=" ">
        <Button
          className="bg-slate-700 text-white  border-transparent"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default MessagesForm;
