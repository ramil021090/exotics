import { Fragment, type Dispatch, type SetStateAction } from "react";
import { useDarkMode } from "../../../darkmode/useDarkMode";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { GiHamburgerMenu } from "react-icons/gi";
import SmallModal from "../../../modals/SmallModal";
import { RxUpdate } from "react-icons/rx";
import { navList } from "../../../lists/navList";
import Logout from "../Logout";
import ThemeToggle from "../../../darkmode/ThemeToggle";
import Modal from "../../../modals/Modal";
import UpdateUserDataform from "./UpdateUserDataform";

interface HamburgerButtonProps {
  openSmallModal: boolean;
  setOpenSmallModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onToggle: () => void;
}

const HamburgerButton = (props: HamburgerButtonProps) => {
  const {
    openSmallModal,
    setOpenSmallModal,
    openModal,
    setOpenModal,
    onToggle,
  } = props;

  useDarkMode();

  return (
    <div className=" py-2 px-4">
      <div className="flex justify-end gap-1 items-center">
        <NavLink to="profile">
          <Avatar />
        </NavLink>
        <button onClick={onToggle}>
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
                <ul className=" md:hidden ">
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

export default HamburgerButton;
