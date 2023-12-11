import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext';

const Header = () => {
    const { user } = useAuthContext();
    return (
        <div>
            <header>
                <div className="col-6 col-sm-12 col-md-12 col-lg-12 col-xl-12 container">
                    <h1>All about cooking <br />
                        Made for living and eating with love...</h1>
                </div>
                <div className="row container header">
                    <div className="col-6 col-sm-10 col-md-10 col-lg-10 col-xl-10 container">
                        <div className="parent">
                            <ul className="social">
                                <div className="parent">
                                    <div className="child">
                                    {user.email && <span>{user.email}</span>}
                                        <li> <Link to="/">Home</Link></li>
                                        
                                        <li> <Link to="/recipes">Recipes</Link>  </li>
                                      
                                    </div>
                                    {user.email
                                        ? <div className="child">
                                            <li> <Link to="/create">Add a new recipe</Link></li>
                                            <li> <Link to="/logout">Logout</Link></li>
                                        </div>
                                        :
                                        <div className="child">
                                            <li> <Link to="/login">Login</Link></li>
                                            <li> <Link to="/register">Register</Link></li>
                                        </div>
                                    }
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </header >
        </div>

    );
};

export default Header;