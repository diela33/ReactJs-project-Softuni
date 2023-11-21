import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { DishContext } from '../../context/DishContext'

import * as dishService from '../../services/dishService';

const DishDetails = ({ addComment, }) => {

    const navigate = useNavigate();
    //console.log(dishes)

    const { dishId } = useParams();
    const [currentDish, setCurrentDish] = useState([]);
    const { user } = useAuthContext();
    const { dishRemove } = useContext(DishContext);

    const [comment, setComment] = useState({
        username: '',
        comment: '',
    });



    useEffect(() => {
        dishService.getOne(dishId)
            .then(result => {
                setCurrentDish(result);
            });
    })


    const addCommentHandler = (e) => {
        e.preventDefault();
        const result = `${comment.name}: ${comment.comment}`;

        addComment(dishId, result);
    }

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const dishDeleteHandler = () => {
        const confirm = window.confirm('Are you sure you want to delete your recipe?');
        if (confirm) {
            dishService.remove(dishId)
                .then(() => {
                    dishRemove(dishId);
                    navigate('/recipes');
                })
        }
    }



    return (
        <section id="dish-details">
            <h3>Details</h3>
            <ul className="list-recipes details">
                <li>
                    <figure className="box-img"><img src={currentDish.image} alt={currentDish.dish} /></figure>
                    <div className="details">
                        <h4>{currentDish.dish}</h4>
                        <label htmlFor="ingredients">Ingredients</label>
                        <p className='ingredients'>
                            {[[currentDish.ingredients]].map(function (nested) {
                                return nested.map(function (element) {
                                    return element + ' '
                                });
                            })
                            }
                        </p>
                        <label htmlFor="preparation">Preparation</label>
                        <p>{currentDish.preparation}</p>


                    </div>
                </li>
            </ul>
            {
                currentDish._ownerId === user._id
                    ? < div className="buttons">
                        <Link to={`/recipes/${dishId}/edit`} className="button">
                            Edit
                        </Link>
                        <button onClick={dishDeleteHandler} className="del-button">
                            Delete
                        </button>
                    </div>
                    : < div className="buttons">
                        <Link to="/" className="button">
                            Home
                        </Link>
                    </div>
            }


            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form-comment" onSubmit={addCommentHandler}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={onChange}
                        value={comment.name}
                    />

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
                    />

                    <input
                        className="add-comment"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section >
    );
};

export default DishDetails;