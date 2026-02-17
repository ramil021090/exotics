import type { ReactNode } from "react";

interface DisplayRowProps {
  children: ReactNode;
}

const DisplayRow = ({ children }: DisplayRowProps) => {
  return (
    <>
      <div className="flex justify-between  bg-slate-50 border px-4 shadow-xl ">
        {children}
      </div>
    </>
  );
};

export default DisplayRow;
