import LoginHome from "../components/LoginHome";
import useDarkMode from "../theme/useDarkMode"; //useDarkMode hook 추가

const Home = () => {
  const [theme, toggleTheme] = useDarkMode();
  return (
    <div>
      <LoginHome></LoginHome>
    </div>
  );
};

export default Home;
