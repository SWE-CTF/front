import { Link } from "react-router-dom";
import useDarkMode from "../theme/useDarkMode"; //useDarkMode hook 추가

const Nav = () => {
  const [theme, toggleTheme] = useDarkMode();

  if (localStorage.getItem("login") === "true") {
    return (
      <header>
        <div>
          <div className="Nav">
            <Link className={`navMenu ${theme.dark ? "dark" : "light"}`} to={"/Problem"}>
              Problem
            </Link>
            <Link className={`navMenu ${theme.dark ? "dark" : "light"}`} to={"/QuestionBoard"}>
              Question Board
            </Link>
            <Link className={`navMenu ${theme.dark ? "dark" : "light"}`} to={"/MyImpormation"}>
              MyInformation
            </Link>
            <Link className={`navMenu ${theme.dark ? "dark" : "light"}`} to={"/Announcement"}>
              Announcement
            </Link>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div>
          <div className="Nav">
            <Link className="navMenu" to={"/Problem"}>
              Problem
            </Link>
            <Link className="navMenu" to={"/QuestionBoard"}>
              Question Board
            </Link>
            <Link className="navMenu" to={"/Announcement"}>
              Announcement
            </Link>
          </div>
        </div>
      </header>
    );
  }
};

export default Nav;
