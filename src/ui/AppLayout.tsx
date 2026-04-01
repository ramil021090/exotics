import Header from "../features/authentication/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Main from "./Main";
import KeepersList from "../features/keepers/KeepersList";
// import Keepers from "../pages/Keepers";

const AppLayout = () => {
  return (
    <>
      <div className="flex min-h-screen max-w-full  bg-slate-50 dark:bg-slate-900 dark:text-white ">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex">
            <Main>
              <div className="max-w-2xl 2xl:max-w-4xl xl:max-w-3xl lg:max-w-lg md:max-w-sm ">
                <Outlet />
              </div>
            </Main>
            <KeepersList />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
