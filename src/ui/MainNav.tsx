import { NavLink } from "react-router-dom";
import { navList } from "../lists/navList";
import NavList from "./NavList";
import { useEffect, useState } from "react";
import { useAuthenticationStore } from "../store/useAuthentication.tsx/useAuthenticationStore";
import supabase from "../supabase/supabaseClients";

const MainNav = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const user = useAuthenticationStore((state) => state.user);

  useEffect(() => {
    const fetchUserId = async () => {
      if (user?.id) {
        setUserId(user.id);
      } else {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();
        if (currentUser?.id) setUserId(currentUser.id);
      }
    };
    fetchUserId();
  }, [user]);

  return (
    <>
      <nav className="list-none pt-30">
        <ul>
          {navList.map(({ name, icon }) => {
            const linkTo =
              name === "profile"
                ? userId
                  ? `/profile/${userId}`
                  : "#"
                : `/${name}`;
            return (
              <li className="pb-4 text-2xl" key={name} aria-label="exotic">
                <NavLink to={linkTo}>
                  <NavList name={name} icon={icon} />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default MainNav;
