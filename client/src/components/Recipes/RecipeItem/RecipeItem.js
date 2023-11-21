
import { Link } from 'react-router-dom'

const RecipeItem = ({ dish }) => {
    console.log(dish)
    return (
        <ul className="list-recipes">
            <li>
                <figure className="box-img"><img src={dish.image} alt={dish.dish} /></figure>
                <div className="overflow">
                    <h4>{dish.dish}</h4>
                    <Link to={`/recipes/${dish._id}`} className="details-button">
                        Details
                    </Link>
                </div>
                
                {dish.comments
                    ? <div><label htmlFor="comments">Comments:</label>{dish.comments.map((item, i) => <p key={i}>{item}</p>)}</div>
                    : <div><label htmlFor="comments">Comments:</label><p>No comments yet.</p></div>
                }

            </li>

        </ul>
    )
}

export default RecipeItem;