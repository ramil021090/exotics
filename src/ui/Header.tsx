import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import NavList from "./NavList";
import Logout from "../features/authentication/Logout";
import { navList } from "../lists/navList";
import { Fragment } from "react/jsx-runtime";
import Avatar from "../features/profile/Avatar";

const Header = () => {
  return (
    <div className="sticky top-0 z-20 bg-white border-slate-700 shadow-sm flex justify-between items-center md:h-19 py-2 px-4">
      <Logo classname="text-left md:hidden" />
      <div className="flex justify-between">
        <ul className=" flex">
          {navList.slice(1).map((data) => (
            <Fragment key={data.id}>
              <NavLink to={`/${data.name}`}>
                <li className=" list-none md:hidden">
                  <NavList
                    classname="text-3xl flex justify-between"
                    icon={data.icon}
                  />
                </li>
              </NavLink>
            </Fragment>
          ))}
        </ul>
      </div>
      <div className="flex justify-end items-center">
        <NavLink to="profile">
          <Avatar />
        </NavLink>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
