import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './RecipeCard.css';
import UserCard from '../../User/UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../../../store/recipes-slice';
import { jwtDecode } from 'jwt-decode';


const RecipeCard = ({ id, title, description, image, steps, ingredients, tags, userId }) => {
    const [likesAmount, setLikesAmount] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const likes = useSelector(state => state.likes.likes);
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const [isLiked, setIsLiked] = useState(false);

    const checkIfLiked = useCallback(() => {
        if (likes.length === 0) {
            setIsLiked(false);
            return;
        }
        const liked = likes.some(like => like.recipeId === id);
        liked ? setIsLiked(true) : setIsLiked(false);
    }, [likes]);

    

    const loadRecipesByTag = async (tagName) => {
        const response = await fetch(`http://localhost:3001/recipes/bytag/${tagName}`)
        const data = await response.json();
        dispatch(setRecipes(data));
    }


    const getLikes = useCallback(() => {
        fetch(`http://localhost:3001/likes/byrecipe/${id}`)
            .then((response) => response.json())
            .then((data) => setLikesAmount(data.length))
            .catch((error) => { alert(error.message) })
    
    }, [id]);

    const addLike = (recipeId) => {
        let like = {
            userId: jwtDecode(token).id,
            recipeId: recipeId
        };
        fetch('http://localhost:3001/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(like)
        })
            .then(response => response.json())
            .then(data => {
                setLikesAmount(prevLikes => data.message.includes("added") ? prevLikes + 1 : prevLikes - 1);
                setIsLiked(data.message.includes("added") ? true : false);
            })
            .catch((error) => {
                alert(error.message);
            });
    };



    useEffect(() => {
        getLikes();
        checkIfLiked();
    }, [getLikes, checkIfLiked]);


    return (
        <div className="recipe-card">
            <h2>{title}</h2>
            <p>{description}</p>
            <img src={image} width="150" alt={title} />
            <div>
                <h4>Ingredients:</h4>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li className="list" key={index}>{ingredient.name}</li>
                    ))}
                </ul>
            </div>

            {showMore && (
                <div className='show-more'>
                    <div>
                        <h4>Steps:</h4>
                        <p>{steps}</p>
                    </div>
                    <div>
                        <h4>Tags:</h4>
                        {tags.map((tag, index) => (

                            <span key={index}> <button onClick={() => loadRecipesByTag(tag.name)}>{tag.name}</button> </span>
                        ))}
                    </div>
                    <div><UserCard id={userId} /></div>
                </div>
            )}
            <div>
          <div className="likes-count"> <FontAwesomeIcon icon={faThumbsUp} onClick={() => addLike(id)}
            className={isLiked ? 'liked-post-thumbs' : 'not-yet-liked-post-thumbs'}
            /></div><p className='like-counter'> {likesAmount}</p></div>
            {/* <div><button className='button' onClick={() => addLike(id)}>Like</button></div> */}
            <button className='button' onClick={() => setShowMore(!showMore)}>{showMore ? 'Show Less' : 'Show More'}</button>
        </div>
    );
};

export default RecipeCard;
