import Logout from "./Logout";
import Avatar from "./header/Avatar";

import { NavLink } from "react-router-dom";
import { navList } from "../../lists/navList";
import { Fragment } from "react/jsx-runtime";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import { useState } from "react";
import SmallModal from "../../modals/SmallModal";
import ThemeToggle from "../../darkmode/ThemeToggle";
import { useDarkMode } from "../../darkmode/useDarkMode";
import UpdateUserDataform from "./header/UpdateUserDataform";
import Modal from "../../modals/Modal";

const Header = () => {
  const [openSmallModal, setOpenSmallModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useDarkMode();

  const handleToggle = () => {
    setOpenSmallModal((prev) => !prev);
  };

  return (
    <div className="sticky top-0 z-20 bg-white border-slate-700 dark:bg-slate-800 shadow-xs py-2 px-4">
      <div className="flex justify-end gap-1 items-center">
        {/* <Logo classname=" md:hidden" /> */}
        <NavLink to="profile">
          <Avatar />
        </NavLink>
        <button onClick={handleToggle}>
          <GiHamburgerMenu />
        </button>
      </div>
      <div className="flex gap-5 justify-end items-center">
        {openSmallModal && (
          <SmallModal onClose={() => setOpenSmallModal(false)}>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setOpenModal(true);
                  setOpenSmallModal(false);
                }}
              >
                <div
                  className="flex items-center"
                  onClick={() => setOpenModal(true)}
                >
                  <RxUpdate />
                  Update profile
                </div>
              </button>
              <div
                className="flex justify-between"
                onClick={() => setOpenSmallModal(false)}
              >
                <ul className=" ">
                  {navList.slice(1).map((data) => (
                    <Fragment key={data.id}>
                      <NavLink to={`/${data.name}`}>
                        <li className=" list-none">
                          <p className=" flex items-center text-lg gap-1.5">
                            {data.icon} <span>{data.name}</span>
                          </p>
                        </li>
                      </NavLink>
                    </Fragment>
                  ))}
                </ul>
              </div>
              <Logout />
              <ThemeToggle
                setOpenSmallModal={setOpenSmallModal}
                openSmallModal={openSmallModal}
              />
            </div>
          </SmallModal>
        )}
      </div>
      {openModal && (
        <Modal>
          <UpdateUserDataform onCancel={() => setOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Header;
