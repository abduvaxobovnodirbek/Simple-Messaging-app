import { Layout } from "antd";
import Messages from "../components/Messages/Messages";
import Sidebar from "../components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../components/ProtectedRoute/ProtectedRoute";
import Error from "./Error";
import NewMessage from "./NewMessage";
import { useState } from "react";

const { Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = (value) => {
    setCollapsed(value);
  };
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
                  <Messages />
                </PrivateRoute>
              }
            />

            <Route
              path="/new_message"
              element={
                <PrivateRoute>
                  <NewMessage />
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
