// react-router-dom imports
import { Outlet } from "react-router-dom";


// components 
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      {/* {NAVBAR} */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* {FOOTER} */}
    </>
  );
}

export default MainLayout;
