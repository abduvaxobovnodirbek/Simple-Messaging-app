import { Button, Form, Input } from "antd";
import Searchbar from "../Search/Searchbar";
const MessagesForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
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
        <Searchbar />
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
        name="message"
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
        <Button className="bg-slate-700 text-white  border-transparent" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default MessagesForm;
