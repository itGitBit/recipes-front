import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import historyReducer from "./history-slice";
import ingredientsSearchReducer from "./ingredient-search-slice";
import recipesListReducer from "./recipes-slice";
import likesReducer from "./likes-slice";


const store = configureStore({
    reducer: {
        user: userReducer,
        history: historyReducer,
        ingredientsSearch: ingredientsSearchReducer,
        recipes: recipesListReducer,
        likes: likesReducer
    }
});

export default store;
