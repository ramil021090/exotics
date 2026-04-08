import { Fragment, useState } from "react";
import HamburgerButton from "./header/HamburgerButton";
import { NavLink } from "react-router-dom";
import { navList } from "../../lists/navList";
import Logo from "../../ui/Logo";

const Header = () => {
  const [openSmallModal, setOpenSmallModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleToggle = () => {
    setOpenSmallModal((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center sticky top-0 z-20 bg-white border-slate-700 dark:bg-slate-800 shadow-xs ">
      <Logo />

      <div>
        {
          <ul className="hidden md:flex ">
            {navList.slice(1).map((data) => (
              <Fragment key={data.id}>
                <NavLink to={`/${data.name}`}>
                  <li className=" list-none">
                    <p className=" text-3xl ">{data.icon}</p>
                  </li>
                </NavLink>
              </Fragment>
            ))}
          </ul>
        }
      </div>
      <HamburgerButton
        openSmallModal={openSmallModal}
        openModal={openModal}
        setOpenSmallModal={setOpenSmallModal}
        setOpenModal={setOpenModal}
        onToggle={handleToggle}
      />
    </div>
  );
};

export default Header;
