import { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  title: string;
  type: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "danger" | "default";
  size?: "sm" | "md" | "lg";
  className?: string;
  deleteId?: number;
  onToggle?: () => void;
  onDelete?: (id: number) => Promise<void>;
  onClose?: () => void;
}
const Button = (props: ButtonProps) => {
  const {
    variant = "default",
    size = "md",
    title,
    className,
    onToggle,
    onDelete,
    onClick,
    deleteId,
    icon,
    ...rest
  } = props;

  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Call onDelete first if it exists
    if (onDelete && deleteId !== undefined) {
      setShowConfirm(true);
      return;
    }

    //  call onToggle
    if (onToggle) {
      onToggle();
    }

    // call the original onClick
    if (onClick) {
      onClick(e);
    }
    //
  };
  const handleConfirmDelete = async () => {
    if (onDelete && deleteId !== undefined) {
      setIsDeleting(true);
      try {
        await onDelete(deleteId);
        setShowConfirm(false);
      } catch (error) {
        console.error("Delete failed!", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  // Size styles
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "lg":
        return "px-6 py-3 text-lg";
      default:
        return "px-4 py-2 text-base";
    }
  };

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gray-600 text-white border rounded-xl shadow-lg active:scale-95  hover:bg-blue-700";
      case "secondary":
        return "bg-blue-600 text-white border rounded-xl shadow-lg active:scale-95 hover:bg-green-400 hover:text-black";
      case "success":
        return "bg-gray-200  rounded-xl shadow-lg active:scale-95 hover:bg-green-700";
      case "danger":
        return "bg-red-600 text-white border rounded-xl shadow-lg active:scale-95 hover:bg-green-700";
      case "default":
        return "mb-1 rounded-md text-black shadow-lg active:scale-95 hover:bg-gray-50 hover:text-gray-700 hover:bg-blue-700";
    }
  };

  const baseStyles =
    "rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  return (
    <div>
      <button
        className={`shadow-lg border-sky-100 ${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        onClick={handleClick}
        disabled={isDeleting}
        {...rest}
      >
        <div className="flex gap-1">
          {icon}
          <span className="text-center">{title}</span>
        </div>
      </button>
      {showConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm shadow-2xl  flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Confirm Delete
              </h3>
              <p className="text-slate-900 mb-6">
                Are you sure you want to delete this item? This action cannot be
                undone.🚫
              </p>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="shadow-lg border-sky-100  px-4 py-2 text-gray-700 border bg-gray-100 hover:bg-gray-200 rounded-md transition disabled:opacity-50"
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="shadow-lg border-sky-100  px-4 py-2 text-white border bg-red-600 hover:bg-red-700 rounded-md transition disabled:opacity-50"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
