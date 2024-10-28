import {Link} from "react-router-dom"

export default function NavBar() {
    return(
        <nav>
            <div>
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/search">Search</Link>
        <Link to="/users">Users</Link>
      </div>
        </nav>
    )
}