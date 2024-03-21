import { createSlice } from "@reduxjs/toolkit";

import errorHandler from "../Components/errors/error-handler";

const ingredientsSearchSlice = createSlice({
    name: "ingredientsSearch",
    initialState: {
        ingredient: null,
        ingredientList: [{ id: 0, name: "" }],
        selectIngredient: null,
        loading: false
    },

    reducers: {
        setIngredient: (state, action) => {
            state.ingredient = action.payload;
        },
        addToIngredientList: (state, action) => {
            if (state.ingredientList.length <= 5) {
                state.ingredientList.push(action.payload);
            }
            if(state.ingredientList.length >5){
                errorHandler("You can only select up to 5 ingredients");
            }
        },
        setSelectedIngredient: (state, action) => {

            state.selectIngredient = action.payload;
        },
        clearSelectedIngredients: (state) => {
            state.ingredientList = [{ id: 0, name: "" }];
        },
        toggleLoadingScreen: (state) => {
            state.loading = !state.loading;
        }
    }
});
export const { setIngredient, addToIngredientList, setSelectedIngredient, clearSelectedIngredients } = ingredientsSearchSlice.actions;
export default ingredientsSearchSlice.reducer;
