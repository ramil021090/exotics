import type { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
const Main = ({ children }: MainProps) => {
  return <main className=" bg-gray-50 flex-1 overflow-auto ">{children}</main>;
};

export default Main;
