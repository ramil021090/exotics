import { type Dispatch, type SetStateAction } from "react";
import { useDarkMode } from "./useDarkmode";

interface ThemeToggleProps {
  openSmallModal: boolean;
  setOpenSmallModal: Dispatch<SetStateAction<boolean>>;
}

const ThemeToggle = ({
  openSmallModal,
  setOpenSmallModal,
}: ThemeToggleProps) => {
  const { theme, toggleTheme } = useDarkMode();

  const handleToggle = () => {
    toggleTheme();
    setOpenSmallModal(false); // close modal after toggling
  };

  if (!openSmallModal) return null;

  return (
    <>
      {openSmallModal && (
        <button
          onClick={handleToggle}
          className="p-2 rounded-md dark:bg-gray-200 bg-gray-700 text-white dark:text-black transition-colors"
          aria-label="Toggle dark mode"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      )}
    </>
  );
};

export default ThemeToggle;
