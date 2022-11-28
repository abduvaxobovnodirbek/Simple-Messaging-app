import { NavLink, useLocation } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import Cookie from "universal-cookie";
import gmail from "../../assets/gmail.png";

const cookie = new Cookie();

const Header = () => {
  let isAuth = cookie.get("username_task7");
  useLocation();
  return (
    <nav className="flex justify-between items-center h-[70px] px-5 shadow-md bg-slate-700 text-white">
      <div>
        <img src={gmail} alt="gmail" style={{ width: "100px" }} />
      </div>
      <span className="flex">
        {!isAuth ? (
          <>
            <NavLink
              to={"/login"}
              className={"text-white mr-2 font-bold flex items-center"}
            >
              <FaUser className="mr-2" />
              Login
            </NavLink>
          </>
        ) : (
          <NavLink
            to={"/login"}
            onClick={() => cookie.remove("username_task7")}
            className={"text-white font-bold mr-2 flex items-center"}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </NavLink>
        )}
      </span>
    </nav>
  );
};

export default Header;
