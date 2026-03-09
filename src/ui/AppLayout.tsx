import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Main from "./Main";

const AppLayout = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <Main>
            <Outlet />
          </Main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
