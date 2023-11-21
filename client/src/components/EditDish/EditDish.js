import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import * as dishService from '../../services/dishService';
import { DishContext } from "../../context/DishContext";

const EditDish = () => {
    const [currentDish, setCurrentDish] = useState({});
    const { dishEdit } = useContext(DishContext);
    const { dishId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dishService.getOne(dishId)
            .then(dishData => {
                setCurrentDish(dishData);
            })
    }, [dishId])

    const onSubmit = (e) => {
        e.preventDefault();

        const dishData = Object.fromEntries(new FormData(e.target));

        dishService.edit(dishId, dishData)
            .then(result => {
                dishEdit(dishId, result);
                navigate(`/recipes/${dishId}`)
            });
    };

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmit}>
                <div className="recipe-container">
                    <div />
                    <h1>Create new recipe</h1>
                    <p>
                        <label htmlFor="recipe-name">Name of the dish:</label>
                        <input
                            type="text"
                            id="dish"
                            name="dish"
                            defaultValue={currentDish.dish}
                        />

                        <br />
                        <label htmlFor="ingredients">Ingredients:</label>
                        <input
                            type="text"
                            id="ingredients"
                            name="ingredients"
                            defaultValue={currentDish.ingredients}
                        />{" "}
                    </p>

                    <p>
                        <label htmlFor="recipe-img">Photo:</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            defaultValue={currentDish.image}
                        />

                    </p>
                    <br />
                    <p>
                        <label htmlFor="preparation">Preparation:</label>
                        <textarea
                            id="preparation"
                            name="preparation"
                            defaultValue={currentDish.preparation}
                        />
                    </p>

                    <p>
                        <input
                            className="btn edit"
                            type="submit"
                            value="Edit"
                        />
                    </p>

                </div >
            </form>
        </section>
    );
}

export default EditDish;
