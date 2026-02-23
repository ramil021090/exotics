import type { ReactNode } from "react";

interface NavListProps {
  name?: string;
  icon?: ReactNode;
  classname?: string;
}
const NavList = ({
  name,
  icon,
  classname = "flex items-center",
}: NavListProps) => {
  return (
    <div className={classname}>
      <span className="mr-2 not-odd:text-2xl">{icon}</span>
      <span className="capitalize">{name}</span>
    </div>
  );
};

export default NavList;
