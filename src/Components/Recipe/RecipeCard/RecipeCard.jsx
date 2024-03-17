import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './RecipeCard.css';
import UserCard from '../../User/UserCard/UserCard';

const RecipeCard = ({ id, title, description, image, steps, ingredients, tags, userId }) => {
    const [likesAmount, setLikesAmount] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const getLikes = useCallback(() => {
        fetch(`http://localhost:3001/likes/byrecipe/${id}`)
            .then((response) => response.json())
            .then((data) => setLikesAmount(data.length))
            .catch((error) => { alert(error.message) })
    }, [id]);

    const addLike = (recipeId) => {
        let like = {
            userId: 5, // Consider dynamically setting this based on authenticated user
            recipeId: recipeId
        };
        console.log(JSON.stringify(like))

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
                console.log("success: ", data);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    useEffect(() => {
        getLikes();
    }, [getLikes]);

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
                            <span key={index}> {tag.name} </span>
                        ))}
                    </div>
                    <div><UserCard id={userId} /></div>
                </div>
            )}
            <p><FontAwesomeIcon icon={faThumbsUp} /> {likesAmount}</p>
            <div><button className='button' onClick={() => addLike(id)}>Like</button></div>
            <button className='button' onClick={() => setShowMore(!showMore)}>{showMore ? 'Show Less' : 'Show More'}</button>
        </div>
    );
};

export default RecipeCard;
