import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
    name: "recipes",
    initialState: {
        recipes: []
    },
    reducers: {
        setRecipes: (state, action) => {
            state.recipes = action.payload;
        },
        addRecipe: (state, action) => {
            state.recipes.push(action.payload);
        },
        deleteRecipe: (state, action) => {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
        },
        updateRecipe: (state, action) => {
            state.recipes = state.recipes.map(recipe => recipe.id === action.payload.id ? action.payload : recipe);
        }
    }
});

export const { setRecipes, addRecipe, deleteRecipe, updateRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;