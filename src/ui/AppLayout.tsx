import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Keepers from "../pages/Keepers";

const AppLayout = () => {
  return (
    <>
      <div className="flex min-h-screen w-full bg-slate-50 ">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex justify-between">
            <Main>
              <Outlet />
            </Main>
            <Keepers />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
