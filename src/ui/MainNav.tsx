import { NavLink } from "react-router-dom";
import { navList } from "../lists/navList";
import NavList from "./NavList";

const MainNav = () => {
  return (
    <>
      <nav className="list-none">
        <ul>
          {navList.map(({ name, icon }) => (
            <li className="py-1 text-xl" key={name} aria-label="exotic">
              <NavLink to={`/${name}`}>
                <NavList name={name} icon={icon} />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MainNav;
