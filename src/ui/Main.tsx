import type { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
const Main = ({ children }: MainProps) => {
  return (
    <main className=" bg-white dark:bg-slate-900 flex-1 overflow-auto mx-35 shadow-lg ">
      {children}
    </main>
  );
};

export default Main;
