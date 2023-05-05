import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Pizza
                </Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/orders" className="nav-link">
                            Orders
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;