import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { TbHomeHeart } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../Services/AuthProvider";
// import { useContext } from "react";
// import { AuthContext } from "../Services/AuthProvider";

function Nav() {
  const { user, logout, setUser } = useContext(AuthContext);
  console.log(user);
  const handleLogout = () => {
    logout();
    setUser("");
  };

  return (
    <div className="fixed w-full bg-white backdrop-blur-2xl bg-opacity-25 z-10">
      <div className="max-w-[1380px] mx-auto flex flex-col gap-2 md:flex-row  justify-between items-center py-4 px-6 ">
        <div className="">
          <img src={logo} alt="" />
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-6">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive ? "text-[#6C72FF] font-semibold" : "text-gray-500"
                }`
              }
            >
              <TbHomeHeart className="text-xl" />
              Home
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive ? "text-[#6C72FF] font-semibold" : "text-gray-500"
                }`
              }
            >
              <AiOutlineProduct className="text-xl" />
              Products
            </NavLink>
          </div>
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-sm  bg-[#6C72FF] text-white hover:bg-[#585eff]"
            >
              Log Out
            </button>
          ) : (
            <Link
              to={"/signin"}
              className="btn btn-sm  bg-[#6C72FF] text-white hover:bg-[#585eff]"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
