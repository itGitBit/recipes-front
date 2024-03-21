import React, { useState } from 'react';
import IngredientsList from '../IngredientsList/IngredientsList';
import { useDispatch } from 'react-redux';
import { setIngredient, clearSelectedIngredients } from '../../../store/ingredient-search-slice';
import { useSelector } from 'react-redux';
import IngredientPage from '../IngredientPage/IngredientPage';
import { setRecipes } from '../../../store/recipes-slice';
import errorHandler from '../../errors/error-handler';
import { useNavigate } from 'react-router-dom';

const IngredientsSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    let filteredIngredientsList = useSelector(state => state.ingredientsSearch.ingredientList);


    const filterIngredient = (e) => {
        setSearchValue(e.target.value);
        if (searchValue === "") {
            dispatch(setIngredient(null));
        } else {
            dispatch(setIngredient(searchValue));
        }
    }


    const searchForRecipe = async () => {
        if (filteredIngredientsList.length < 3) {
            errorHandler("You must select at least 3 ingredients");
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/recipes/getbyingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients: filteredIngredientsList }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const recipesData = await response.json();
            dispatch(setRecipes(recipesData));
            navigate('/recipes');

        } catch (error) {
            errorHandler(error);
        }
    }


    const clearList = () => {
        dispatch(clearSelectedIngredients());
    }

    return (

        <div>
            <h1>Ingredients</h1>
            <input type="text" placeholder="Search Ingredients" onChange={filterIngredient} />
            <div className='ingredient-search-container'>
                {filteredIngredientsList.map((ingredient, index) => (<IngredientPage key={index} name={ingredient.name} />))}
            </div>
            <div className="search-recipe-button">
                <button onClick={searchForRecipe}>Search Recipes</button>
                <button onClick={clearList}>Clear List</button>
            </div>
            <IngredientsList />
        </div>
    );


}


export default IngredientsSearch;