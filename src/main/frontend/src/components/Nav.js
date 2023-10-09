import { Link } from "react-router-dom";
import logo from "../cherry.png";

const Nav = () => {
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
          MyImpormation
        </Link>
      </div>
      <div className="myPageLogo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
    </div>
    </header>
  );
};

export default Nav;
