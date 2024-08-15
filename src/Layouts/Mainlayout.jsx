import { Outlet } from "react-router-dom"
import Nav from "../Shared/Nav"
import Footer from "../Shared/Footer"

function Mainlayout() {
  return (
      <div>
          <Nav/>
          <Outlet />
          <Footer/>
    </div>
  )
}

export default Mainlayout
