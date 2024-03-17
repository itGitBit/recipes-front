import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../utils/apiCalls";
import { useSelector } from "react-redux";
import errorHandler from "../errors/error-handler";


const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailRef = useRef('');
    const passwordRef = useRef('');

    const token = useSelector(state => state.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const loginData = await performLogin(email, password);
        if (loginData) {
            console.log(` login data: ${JSON.stringify(loginData)}`);
            dispatch(login(loginData.refreshToken));
            navigate('/');
        }
    }

    const performLogin = async (email, password) => {
        const response = await fetch(`http://localhost:3001/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        if (data.error) {
            errorHandler(data.error);
        }
        return null;
    }
    return (
        !token ?
            <div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <>
                        <label>Email:</label>
                        <input type="email" value={emailRef.current.value} ref={emailRef} />
                    </>
                    <>
                        <label>Password:</label>
                        <input type="password" value={passwordRef.current.value} ref={passwordRef} />
                    </>
                    <>
                        <button type="submit">Login</button>
                    </>
                </form>
            </div> :
            <Navigate to="/" />
    );
}
export default LoginPage;