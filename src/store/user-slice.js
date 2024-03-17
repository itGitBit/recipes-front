import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



// export const getUser = createAsyncThunk("user/getUser", async (id) => {
//     try {
//         const response = await fetch(`http://localhost:3001/users/${id}`);
//         return await response.json();
//     } catch (error) {
//         toast.error(error.message);
//     }
// });


const userSlice = createSlice({
    name: "user",
    initialState: {
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            // localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            state.token = null;
            // localStorage.removeItem('token');
        }
    },
});
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;