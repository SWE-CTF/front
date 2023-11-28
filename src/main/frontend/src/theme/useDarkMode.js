import { useState, useEffect } from "react";

// 로컬 스토리지에서 사용자의 테마 설정을 가져오는 함수
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme ? JSON.parse(savedTheme) : { dark: false };
};

// 사용자의 테마 설정을 로컬 스토리지에 저장하는 함수
const saveThemeToLocalStorage = (theme) => {
  localStorage.setItem("theme", JSON.stringify(theme));
};

const useDarkMode = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    const newTheme = { dark: !theme.dark };
    setTheme(newTheme);
    saveThemeToLocalStorage(newTheme);
  };

  useEffect(() => {
    const savedTheme = getInitialTheme();
    setTheme(savedTheme);
  }, []);

  return [theme, toggleTheme];
};

export default useDarkMode;
