const ThemeToggle = ({ darkMode, toggleDarkMode }) => (
    <button
      onClick={toggleDarkMode}
      className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded mb-4"
    >
      Modo {darkMode ? "Claro" : "Oscuro"}
    </button>
  );
  
  export default ThemeToggle;
  