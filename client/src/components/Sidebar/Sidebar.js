import { RiInboxArchiveLine } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";
import { FaPen } from "react-icons/fa";

import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

const Sidebar = ({ collapsed, handleCollapse }) => {
  const navigate = useNavigate();
  return (
    <Sider
      style={{ background: "#334254" }}
      collapsed={collapsed}
      collapsible
      onCollapse={(value) => handleCollapse(value)}
    >
      <Menu
        mode="inline"
        style={{ background: "#334254", color: "white", marginTop: "15px" }}
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "3",
            icon: <FaPen />,
            label: "Write message",
            onClick: ({ key }) => navigate("/new_message"),
          },
          {
            key: "1",
            icon: <RiInboxArchiveLine />,
            label: "All messages",
            onClick: ({ key }) => navigate(""),
          },
          {
            key: "2",
            icon: <AiOutlineStar />,
            label: "Starred Messages",
            onClick: ({ key }) => navigate("/"),
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
