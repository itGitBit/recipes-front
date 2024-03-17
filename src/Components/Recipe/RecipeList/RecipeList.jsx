import { useEffect, useState } from "react"
import RecipeCard from "../RecipeCard/RecipeCard";
import './RecipeList.css'
import { getAllData } from "../../../utils/apiCalls";


const RecipeList = () => {
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);

useEffect(() =>{
    getAllRecipes();
    
},[])

    const getAllRecipes = async () => {
        setLoading(true);
        try {
            const fetchedRecipes = await getAllData("recipes");
            setRecipes(fetchedRecipes);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
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
            {/* <button onClick={getAllRecipes}>Load Recipes</button> */}
        </div>
    );

}
export default RecipeList