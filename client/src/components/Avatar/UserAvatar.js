import { Avatar } from "antd";
import Cookies from "universal-cookie";

const UserAvatar = () => {
  const cookies = new Cookies();

  return (
    <>
      <Avatar
        style={{
          backgroundColor: "#477cb5",
          verticalAlign: "middle",
        }}
        size="large"
        gap={4}
        className="mr-3"
      >
        {cookies.get("username_task7")}
      </Avatar>
    </>
  );
};
export default UserAvatar;
