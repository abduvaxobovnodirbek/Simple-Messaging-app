import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "./components/Header/Header";
import Error from "./pages/Error";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { PrivateRoute } from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  const cookie = new Cookies();
  let isAuth = cookie.get("username_task7");

  useLocation();

  return (
    <div className="min-h-screen bg-slate-400 flex flex-col">
      <Header />
      <Routes>
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
