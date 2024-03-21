import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainHeader.css';
import { logout } from '../../store/user-slice';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../../store/recipes-slice';



const MainHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(state => state.user.token);

    const loadAndNavigate =  () => {
        dispatch(setRecipes([]));
        navigate('/recipes');
    }



    const loggedInDisplay = () => {
        return (
            <nav>
                <button className="nav-button" onClick={() => navigate('/')}>Home</button>
                <button className="nav-button" onClick={loadAndNavigate}>Recipes</button>
                <button className="nav-button" onClick={() => navigate('/ingredients')}>Recipe Search</button>
                <button className="nav-button" onClick={() => navigate('/user')}>User Info</button>
                <button className="nav-button" onClick={() => dispatch(logout())}>Logout</button>
            </nav>
        )
    }

    const loggedOutDisplay = () => {
        return (
            <nav>
                <button className="nav-button" onClick={() => navigate('/')}>Home</button>
                <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
            </nav>
        )
    };

    return (
        <header>
            {token ? loggedInDisplay() : loggedOutDisplay()}
        </header>
    );
}
export default MainHeader;
