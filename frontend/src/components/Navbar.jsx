import { Link } from "react-router-dom";
import "./NavBar.css";
//navbar
export default function NavBar() {
  return (
    <nav>
      <div>
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="/login">Log In</Link>
        </span>
        <span>
          <Link to="/signup">Sign Up</Link>
        </span>
        <span>
          <Link to="/search">Search</Link>
        </span>
        <span>
          <Link to="/users">Users</Link>
        </span>
      </div>
    </nav>
  );
}
