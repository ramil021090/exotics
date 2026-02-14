import type { ReactNode } from "react";

interface DisplayRowProps {
  children: ReactNode;
}

const DisplayRow = ({ children }: DisplayRowProps) => {
  return (
    <>
      <div className="flex justify-between  bg-slate-200 border px-4 mb-0.5">
        {children}
      </div>
    </>
  );
};

export default DisplayRow;
