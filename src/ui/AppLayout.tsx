import Header from "../features/authentication/Header";
import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Main from "./Main";
// import Keepers from "../pages/Keepers";
// import Keepers from "../pages/Keepers";

const AppLayout = () => {
  return (
    <>
      <div className=" min-h-screen max-w-full  bg-slate-50 dark:bg-slate-900 dark:text-white ">
        {/* <Sidebar /> */}
        <Header />
        <div className="flex justify-center text-center items-center ">
          {/* <Keepers /> */}
          <Main>
            <div className=" max-w-2xl 2xl:max-w-4xl xl:max-w-3xl lg:max-w-lg md:max-w-sm ">
              <Outlet />
            </div>
          </Main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
