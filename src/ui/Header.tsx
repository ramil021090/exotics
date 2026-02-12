import type { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}
const Header = ({ children }: HeaderProps) => {
  return (
    <div className="sticky top-0 z-20 bg-white border-slate-700 shadow-sm h-19 py-3 px-6">
      {children}
    </div>
  );
};

export default Header;
