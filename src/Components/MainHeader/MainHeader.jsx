import React from 'react';
import { Link } from 'react-router-dom';
import './MainHeader.css';


const MainHeader = () => {
    return (
        <header>
            <nav>
                <ul className="nav-likes">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/recipes">Recipes</Link></li>
                    <li><Link to="/ingredients">Ingredients</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default MainHeader;
