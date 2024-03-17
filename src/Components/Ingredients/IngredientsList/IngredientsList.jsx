import IngredientPage from "../IngredientPage/IngredientPage";
import { getAllData } from "../../../utils/apiCalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToIngredientList } from "../../../store/ingredient-search-slice";

const IngredientsList = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    const filterIngredient = useSelector(state => state.ingredientsSearch.ingredient);
    const filteredIngredientList = useSelector(state => state.ingredientsSearch.ingredientList);


    useEffect(() => {
        getAllIngredients();
    }, []);

    const getAllIngredients = async () => {
        setLoading(true);
        const fetchedIngredients = await getAllData("ingredients");
        setIngredients(fetchedIngredients);
        setLoading(false);
    }

    const addFilteredIngredient = (ingredient) => {
        dispatch(addToIngredientList(ingredient))
    }

    const filteredNamesSet = new Set(filteredIngredientList.map(ingredient => ingredient.name.toLowerCase()));

    return (
        <div className="ingredients-list">
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                ingredients
                .filter(ingredient => 
                    filterIngredient ? ingredient.name.toLowerCase().includes(filterIngredient.toLowerCase()) : true
                )
                .filter(ingredient => 
                    !filteredNamesSet.has(ingredient.name.toLowerCase())
                )
                .map((ingredient, index) => (
                    <div key={index}>
                        <IngredientPage name={ingredient.name} />
                        <button onClick={() => addFilteredIngredient(ingredient)}>Add to filter</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default IngredientsList;