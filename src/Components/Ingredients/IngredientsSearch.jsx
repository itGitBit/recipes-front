import React, { useState, useEffect } from 'react';
import { getAllData } from '../../utils/apiCalls';

const IngredientsSearch = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getAllIngredients();
    }, []);

    const getAllIngredients = async () => {
        const fetchedIngredients = await getAllData("ingredients");
        setIngredients(fetchedIngredients);
    }


    const addQueryToIngredientsList = () => {
        setSearchResults([...searchResults, query]);
    }


    return (

        <div>
            <h1>Ingredients</h1>
            <input type="text" placeholder="Search Ingredients" />
            <button onClick={addQueryToIngredientsList}>Search</button>
        </div>
    );


}

export default IngredientsSearch;