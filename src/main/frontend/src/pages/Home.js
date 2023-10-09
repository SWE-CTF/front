import { Link } from "react-router-dom";
import logo from "../cherry.png";
import useDarkMode from "../theme/useDarkMode"; //useDarkMode hook 추가


const Home = () => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <div className={`container ${theme.dark ? "dark" : "light"}`}>
      <div className="darkBtn">
        <button onClick={toggleTheme}>
          {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="menu">
        <Link to="/Signup" className={`menu-link ${theme.dark ? "dark" : "light"}`}>
          Register
        </Link>
        <Link to="/login" className={`menu-link ${theme.dark ? "dark" : "light"}`}>
          Log in
        </Link>
        <Link to="/Scoreboard" className={`menu-link ${theme.dark ? "dark" : "light"}`}>
          Scoreboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
