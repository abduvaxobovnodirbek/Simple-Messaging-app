import { useEffect, useState } from "react";
import { Layout } from "antd";
import io from "socket.io-client";
import { Route, Routes } from "react-router-dom";
import Messages from "../components/Messages/Messages";
import Sidebar from "../components/Sidebar/Sidebar";
import { PrivateRoute } from "../components/ProtectedRoute/ProtectedRoute";
import Error from "./Error";
import NewMessage from "./NewMessage";
import useWindowSize from "../customHook/useWindowSize";

const { Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);

  const socket = io("http://localhost:5000");

  const handleCollapse = (value) => {
    setCollapsed(value);
  };

  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 800) {
      setCollapsed(true);
    }
  }, [width]);

  return (
    <Layout className="h-100%">
      <Sidebar collapsed={collapsed} handleCollapse={handleCollapse} />
      <Layout className="site-layout bg-slate-400">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Messages allMessages={true} socket={socket} />
                </PrivateRoute>
              }
            />

            <Route
              path="/new_message"
              element={
                <PrivateRoute>
                  <NewMessage socket={socket} />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
