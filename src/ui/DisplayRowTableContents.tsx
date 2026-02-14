import type { ReactNode } from "react";

interface DisplayRowTableContentsProps {
  children: ReactNode;
  className?: ReactNode;
}
const DisplayRowTableContents = ({
  children,
  className,
}: DisplayRowTableContentsProps) => {
  return (
    <>
      <p
        className={`bg-amber-500  min-w-40 mr-1 px-4 py-2 flex text-left  text-sm font-medium ${className}`}
      >
        {children}
      </p>
    </>
  );
};

export default DisplayRowTableContents;
