import type { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
const Main = ({ children }: MainProps) => {
  return (
    <main className=" bg-white dark:bg-slate-900  overflow-auto  shadow-md ">
      {children}
    </main>
  );
};

export default Main;
