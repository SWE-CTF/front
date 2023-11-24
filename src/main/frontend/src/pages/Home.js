import { Link } from "react-router-dom";
import logo from "../cherry.png";
import useDarkMode from "../theme/useDarkMode"; //useDarkMode hook 추가
import LoginHome from "../components/LoginHome";
import Nav from "../components/Nav";
import HomeButton from "../components/HomeButton";

const Home = () => {
  const [theme, toggleTheme] = useDarkMode();
  return (
    <div>
      <Nav></Nav>
      <HomeButton></HomeButton>
      <LoginHome></LoginHome>
    </div>
  );
};

export default Home;
