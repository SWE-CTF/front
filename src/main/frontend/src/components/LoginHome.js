import { Link } from "react-router-dom";
import logo from "../cherry.png";
import HomeButton from "../components/HomeButton";
import useDarkMode from "../theme/useDarkMode";
const LoginHome = () => {
  const [theme, toggleTheme] = useDarkMode();
  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("login_token");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("nickname");
    window.location.reload();
  };

  if (localStorage.getItem("login") === "true") {
    return (
      <div className={`container ${theme.dark ? "dark" : "light"}`}>
        <HomeButton></HomeButton>
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
          <Link to="/" className={`menu-link ${theme.dark ? "dark" : "light"}`}>
            <button
              className={`menu-link ${theme.dark ? "dark" : "light"}`}
              onClick={logout}
            >
              Log out
            </button>
          </Link>
          <Link
            to="/Rank"
            className={`menu-link ${theme.dark ? "dark" : "light"}`}
          >
            Scoreboard
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`container ${theme.dark ? "dark" : "light"}`}>
        <HomeButton></HomeButton>
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
          <Link
            to="/Signup"
            className={`menu-link ${theme.dark ? "dark" : "light"}`}
          >
            Register
          </Link>
          <Link
            to="/login"
            className={`menu-link ${theme.dark ? "dark" : "light"}`}
          >
            Log in
          </Link>
          <Link
            to="/Rank"
            className={`menu-link ${theme.dark ? "dark" : "light"}`}
          >
            Scoreboard
          </Link>
        </div>
      </div>
    );
  }
};

export default LoginHome;
