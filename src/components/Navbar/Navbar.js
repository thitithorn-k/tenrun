import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar(props) {
    return (
        <div className="navbar">
            <div className="title noselect">TenRun</div>
            <div className="navbar-menus noselect">
                <ul>
                    <Link to='/'><li className='navbar-menus-menu'>Home</li></Link>
                    {props.isLogin && <Link to='/add-activity'><li className='navbar-menus-menu'>Add Activity</li></Link>}
                    {props.isLogin && <Link to='/history'><li className='navbar-menus-menu'>History</li></Link>}
                    {!props.isLogin && <Link to='/login'><li className='navbar-menus-menu'>Log in</li></Link>}
                    {!props.isLogin && <Link to='/register'><li className='navbar-menus-register'>Register</li></Link>}
                    {props.isLogin && <Link to='#'><li className='navbar-menus-register' onClick={props.handdleLogout}>Logout</li></Link> }
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