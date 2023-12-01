import LoginHome from "../components/LoginHome";
import Nav from "../components/Nav";
import useDarkMode from "../theme/useDarkMode"; //useDarkMode hook 추가

const Home = () => {
  const [theme, toggleTheme] = useDarkMode();
  return (
    <div>
      <Nav></Nav>
      <LoginHome></LoginHome>
    </div>
  );
};

export default Home;
