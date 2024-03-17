import { createSlice } from "@reduxjs/toolkit";

const ingredientsSearchSlice = createSlice({
    name: "ingredientsSearch",
    initialState: {
        ingredient: null,
        ingredientList: [{ id: 0, name: "" }],
        selectIngredient: null
    },

    reducers: {
        setIngredient: (state, action) => {
            console.log(action.payload);
            state.ingredient = action.payload;
        },
        addToIngredientList: (state, action) => {
            state.ingredientList.push(action.payload);
        },
        setSelectedIngredient: (state, action) => {

            state.selectIngredient = action.payload;
        },
        clearSelectedIngredients: (state) => {
            state.ingredientList = [{ id: 0, name: "" }];
        }
    }
});
export const { setIngredient, addToIngredientList, setSelectedIngredient, clearSelectedIngredients } = ingredientsSearchSlice.actions;
export default ingredientsSearchSlice.reducer;
