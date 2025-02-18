import { Link } from "react-router-dom";
import '../css/NavBar.css'
const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <Link to="/">AniPedia</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-links">Home</Link>
                <Link to="/favorites" className="nav-links">Favorites</Link>
            </div>
        </div>
    );
};

export default NavBar;