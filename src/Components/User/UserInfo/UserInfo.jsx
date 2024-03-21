import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../utils/apiCalls"
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setRecipes, toggleLoadingScreen } from "../../../store/recipes-slice";
import { toast } from "react-toastify";
import errorHandler from "../../errors/error-handler";

const UserInfo = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editImg, setEditImg] = useState(false);

    const [user, setUser] = useState({ username: '', profilePicture: '', email: '' });

    const token = useSelector(state => state.user.token);

    const getUserInfo = async () => {
        const response = await getData(jwtDecode(token).id, 'users');
        setUser(response);
    }

    const seeYourRecipes = async () => {
        try {
            dispatch(toggleLoadingScreen());
            const response = await fetch(`http://localhost:3001/recipes/byuser/${jwtDecode(token).id}`);
            const fetchedRecipes = await response.json();
            if (fetchedRecipes.length === 0) {
                toast('You have no recipes yet. Showing all recipes instead ')
            };
            dispatch(setRecipes(fetchedRecipes));
        } catch (error) {
            errorHandler(error.message);
        } finally {
            dispatch(toggleLoadingScreen());
        }
        navigate('/recipes');
    }

    const updateUsername = async () => {
        await updateUser();
        setUsername(false);
    }

    const updateEmail = async () => {
        await updateUser();
        setEditEmail(false);
        console.log(editEmail);
    }


    const updateUser = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...user, id: jwtDecode(token).id })
            });
            const updatedUser = await response.json();
            setUser(updatedUser);

        } catch (error) {
            errorHandler(error.message);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [token]);

    return (
        <div>
            <h1>UserInfo</h1>
            <div className="user-info">
                {username ? <div>
                    <input type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    <button onClick={updateUsername}>Save</button>
                </div> : <div className="username-display">
                    <h2>Username: {user.username} </h2> <button onClick={() => setUsername(true)}>Edit</button>
                </div>}
                {editEmail ? <div>
                    <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <button onClick={updateEmail }>Save</button></div>
                    : <div className="email">
                        <h2>Email: {user.email} </h2><button onClick={() => setEditEmail(true)}>Edit</button>
                    </div>}
                <div className="img-block">
                    <div className="img">
                        <img src={user.profilePicture} width='200px' alt="profile" />
                    </div>
                    <button>Edit</button>
                </div>
                <h2>recipes: </h2>
                <button onClick={seeYourRecipes}>See Your Recipes</button>
            </div>

        </div>
    )
}
export default UserInfo;
