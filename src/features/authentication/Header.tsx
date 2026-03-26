import Logo from "../../ui/Logo";
import NavList from "../../ui/NavList";
import Logout from "./Logout";
import Avatar from "./header/Avatar";

import { NavLink, useNavigate } from "react-router-dom";
import { navList } from "../../lists/navList";
import { Fragment } from "react/jsx-runtime";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import { useState } from "react";
import SmallModal from "../../modals/SmallModal";
import ThemeToggle from "../../darkmode/ThemeToggle";
import { useDarkMode } from "../../darkmode/useDarkMode";

const Header = () => {
  const [openSmallModal, setOpenSmallModal] = useState(false);

  const navigate = useNavigate();
  useDarkMode();

  const handleToggle = () => {
    setOpenSmallModal((prev) => !prev);
  };

  return (
    <div className="sticky top-0 z-20 bg-white border-slate-700 dark:bg-slate-800 shadow-xs flex justify-between items-center md:h-19 py-2 px-4">
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
            <div className="flex flex-col gap-3">
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
              <ThemeToggle
                setOpenSmallModal={setOpenSmallModal}
                openSmallModal={openSmallModal}
              />
            </div>
          </SmallModal>
        )}
      </div>
    </div>
  );
};

export default Header;
