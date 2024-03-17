import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const Home = () => {
    const token = useSelector(state => state.token);

    return (
        token ?
            <div>
                <h1>Home</h1>
            </div> :
            <Navigate to="/login" />
    );
}
export default Home;