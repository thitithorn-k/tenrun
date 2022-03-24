import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar(props) {
    return (
        <div className="navbar">
            <div className="noselect">TenRun</div>
            <div className="navbar-menu">
                <ul>
                    <Link to='/'><li className="noselect">Home</li></Link>
                    <Link to='/add-activity'><li className="noselect">Add Activity</li></Link>
                    <Link to='#'><li className="noselect">Sign in</li></Link>
                    <Link to='#'><li className="noselect">Sign up</li></Link>
                </ul>
            </div>
            <div className="navbar-hamburger">
                <svg className="nav-icon">
                    <svg width="100%" viewBox="0 0 24 24" height="100%">
                        <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
                    </svg>
                </svg>
            </div>
        </div>
    );
}

export default Navbar;