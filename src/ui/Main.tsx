import type { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
const Main = ({ children }: MainProps) => {
  return (
    <main className=" bg-white flex-1 overflow-auto mx-35 ">{children}</main>
  );
};

export default Main;
