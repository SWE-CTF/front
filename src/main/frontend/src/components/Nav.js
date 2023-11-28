import { Link } from "react-router-dom";
import logo from "../cherry.png";

const Nav = () => {
  if (localStorage.getItem("login") === "true") {
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
            <Link className="navMenu" to={"/MyImpormation"}>
              MyInformation
            </Link>
            <Link className="navMenu" to={"/Announcement"}>
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
