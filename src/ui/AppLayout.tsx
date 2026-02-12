import Header from "./Header";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { navList } from "../lists/navList";
import NavList from "./NavList";
import Logo from "./Logo";
import { Fragment } from "react/jsx-runtime";
import Main from "./Main";

const AppLayout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header>
            <div className="flex justify-between">
              <Logo classname="text-left md:hidden" />
              <ul className=" flex shrink mx-8">
                {navList.slice(1).map((data) => (
                  <Fragment key={data.id}>
                    <NavLink to={`/${data.name}`}>
                      <li className=" list-none mt-3 md:hidden">
                        <NavList
                          classname="text-2xl flex justify-between"
                          icon={data.icon}
                        />
                      </li>
                    </NavLink>
                  </Fragment>
                ))}
              </ul>
              <NavLink to="profile">profile</NavLink>
            </div>
          </Header>
          <Main>
            <Outlet />
          </Main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
