import React from "react";
import { useSelector } from "react-redux";
const ThemeProvider = ({ children }) => {
  const state = useSelector((state) => state);
  console.log(state.theme)
  return (
    <div className={state.theme}>
      <div className="'bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]">{children}</div>
    </div>
  );
};

export default ThemeProvider;
