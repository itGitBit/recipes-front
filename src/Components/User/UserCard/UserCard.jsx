import { useEffect, useState } from "react";
import { getData } from "../../../utils/apiCalls";


const UserCard = ({ id }) => {
    const [user, setUser] = useState({ username: '', profilePicture: '' });

    useEffect(() => {
        getUser(id);
    }, [id]);


    const getUser = async (id) => {
        const fetchedUser = await getData(id, "users");
        setUser(fetchedUser);
    }

    return (
        <div>
            <h3>{user.username}</h3>
            <img src={user.profilePicture} width='150px' alt="profile" />
        </div>
    );
};

export default UserCard;
