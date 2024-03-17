import { useEffect, useState, useCallback } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import './RecipeList.css';
import { getAllData } from "../../../utils/apiCalls";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../../../store/recipes-slice";

const RecipeList = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const recipes = useSelector(state => state.recipes.recipes);
    const token = useSelector(state => state.user.token);

    const getAllRecipes = useCallback(async () => {
        setLoading(true);
        try {
            const fetchedRecipes = await getAllData("recipes");
            dispatch(setRecipes(fetchedRecipes));
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }, [dispatch]); // Assuming getAllData and setRecipes don't need to be dependencies

    useEffect(() => {
        getAllRecipes();
    }, [getAllRecipes]);

    return (
        token ?
            <div className="recipe-card-in-list">
                {loading ? <h3>Loading...</h3> : recipes.map((recipe, index) => (
                    <div key={index}>
                        <RecipeCard
                            id={recipe.id}
                            title={recipe.title}
                            description={recipe.description}
                            image={recipe.image}
                            steps={recipe.steps}
                            ingredients={recipe.ingredients}
                            tags={recipe.tags}
                            likesAmount={recipe.likesAmount}
                            userId={recipe.userId}
                        />
                    </div>
                ))}
            </div> :
            <Navigate to="/login" />
    );
}

export default RecipeList;
