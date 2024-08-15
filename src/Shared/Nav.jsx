import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { TbHomeHeart } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";

function Nav() {
  return (
    <div className="max-w-7xl mx-auto flex  justify-between items-center my-6">
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
        <Link to={'/signin'}  className="btn bg-[#6C72FF] text-white hover:bg-[#585eff]">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Nav;
