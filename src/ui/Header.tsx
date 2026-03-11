import Logo from "./Logo";
import NavList from "./NavList";
import Logout from "../features/authentication/Logout";
import Avatar from "../features/authentication/header/Avatar";

import { NavLink, useNavigate } from "react-router-dom";
import { navList } from "../lists/navList";
import { Fragment } from "react/jsx-runtime";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import { useState } from "react";
import SmallModal from "../modals/SmallModal";

const Header = () => {
  const [openSmallModal, setOpenSmallModal] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setOpenSmallModal((prev) => !prev);
  };

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
      <div className="flex gap-5 justify-end items-center">
        <NavLink to="profile">
          <Avatar />
        </NavLink>
        <button onClick={handleToggle}>
          <GiHamburgerMenu />
        </button>
        {openSmallModal && (
          <SmallModal onClose={() => setOpenSmallModal(false)}>
            <div className="flex flex-col">
              <button
                onClick={() => {
                  navigate(`/updateProfile`);
                  setOpenSmallModal(false);
                }}
              >
                <div className="flex items-center">
                  <RxUpdate />
                  Update profile
                </div>
              </button>
              <Logout />
            </div>
          </SmallModal>
        )}
      </div>
    </div>
  );
};

export default Header;
