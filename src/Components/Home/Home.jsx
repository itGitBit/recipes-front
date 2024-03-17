import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addHistory } from '../../store/history-slice';


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleExploreButton = () => {
        const navigateTo = '/recipes';
        dispatch(addHistory(navigateTo));
        navigate(navigateTo);
    }

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page</p>
            <p>Click the button below to explore all recipes</p>
            <button onClick={handleExploreButton}>Explore All Recipes</button>

        </div>
    );
}
export default Home;