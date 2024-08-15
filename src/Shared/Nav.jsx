import logo from "../assets/logo.png";

function Nav() {
  return (
    <div className="max-w-7xl mx-auto flex  justify-between items-center my-6">
      <div className="">
        <img src={logo} alt="" />
      </div>
      <div className="">
        <button className="btn bg-[#6C72FF] text-white hover:bg-[#585eff]">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Nav;
