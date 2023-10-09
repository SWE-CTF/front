import logo from "../cherry.png";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <span className="HomeButton">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </span>
  );
};

export default HomeButton;
