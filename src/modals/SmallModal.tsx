import { useEffect, useRef, type ReactNode } from "react";

interface SmallModalProps {
  children: ReactNode;
  onClose: () => void;
}

const SmallModal = ({ children, onClose }: SmallModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div
      className=" absolute top-0 bg-slate-50 shadow-lg  p-4 ml-5 z-50 "
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default SmallModal;
