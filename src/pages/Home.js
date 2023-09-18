import { Link } from "react-router-dom";
import logo from "../cherry.png";

const Home = () => {
  return (
    <div>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="menu">
        <Link to="/register" className="menu-link">
          Register
        </Link>
        <Link to="/login" className="menu-link">
          Log in
        </Link>
        <Link to="/scoreboard" className="menu-link">
          Scoreboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
