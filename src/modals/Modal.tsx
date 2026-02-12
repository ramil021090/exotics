import { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center  backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 mx-auto transition-all scale-125">
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
