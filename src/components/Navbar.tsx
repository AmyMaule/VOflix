import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar-container">
      <Link className="navbar-logo" to="/">V.O.flix</Link>
    </header>
  )
}

export default Navbar;
