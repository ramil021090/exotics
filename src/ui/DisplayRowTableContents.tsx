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
        className={` max-w-auto  mr-1  py-2 flex text-left
            text-sm font-medium ${className}`}
      >
        {children}
      </p>
    </>
  );
};

export default DisplayRowTableContents;
