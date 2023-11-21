import { useState } from 'react'

import { useFormInputValidation } from "react-form-input-validation";
import validator from 'validator';

import { useContext } from 'react';

import { DishContext } from '../../context/DishContext';
import * as dishService from '../../services/dishService';



const CreateDish = () => {

    const { dishAdd } = useContext(DishContext);

    const [fields, errors, form] = useFormInputValidation({
        dish: "",
        ingredients: "",
        image: "",
        preparation: "",
    }, {
        dish: "required",
        ingredients: "required",
        image: "reqired",
        preparation: "required",
    });


    const [list, setList] = useState([]);

    const [value, setValue] = useState("");
    const addIngredient = (e) => {
        e.preventDefault();
        let tempArr = list;
        if (value !== '') {
            tempArr.push(value);
            setList(tempArr);
            setValue("")
        }

    };

    const deleteIngredient = (index) => {
        let temp = list.filter((item, i) => i !== index);
        setList(temp);
    };

    console.log(fields);
    console.log(list);

    const [errorMessage, setErrorMessage] = useState('')

    const validate = (value) => {
        console.log(value)

        if (validator.isURL(value)) {
            setErrorMessage(null);
        } else {
            setErrorMessage('Image url is not valid')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
       // const isValid = await form.validate(e);
            const dishData = Object.fromEntries(new FormData(e.target));
            dishData.ingredients = []
            dishData.ingredients.push(list)


            console.log(dishData)

            dishService.create(dishData)
                .then(result => {
                    dishAdd(result)
                });
      


    };



    return (

        <div>
            <section id="recipe-page" className="content auth">
                <form
                    id="create-recipe"
                    noValidate
                    autoComplete="off"
                    onSubmit={onSubmit}
                >
                    <div className="recipe-container">
                        <div />
                        <h1>Create new recipe</h1>
                        <p>
                            <label htmlFor="recipe-name">Name of the dish:</label>
                            <input
                                type="text"
                                id="dish"
                                name="dish"
                                onBlur={form.handleBlurEvent}
                                onChange={form.handleChangeEvent}
                            />
                            <label className="error">
                                {errors.dish
                                    ? errors.dish
                                    : ""}
                            </label>
                            <br />
                            <label htmlFor="ingredients">Ingredients:</label>
                            <input
                                type="text"
                                id="ingredients"
                                name="ingredients"
                                placeholder="2 glass of wine"
                                onBlur={form.handleBlurEvent}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />{" "}
                        </p>

                        <ul className='list-ingredients'>{list.length > 0 && list.map((item, i) => <li key={i}>{item}
                            <button className="btn delete" onClick={() => deleteIngredient(i)}> Delete </button><br /></li>)}
                        </ul>

                        <button
                            className="btn add"
                            onClick={addIngredient}
                        >
                            Add ingredients
                        </button>
                        <p>
                            <label htmlFor="recipe-img">Photo:</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                onChange={(e) => validate(e.target.value)}
                                placeholder="Upload a photo..."
                            />
                            <label className="error">
                                {errorMessage
                                    ? errorMessage
                                    : ""}
                                {errors.image
                                    ? errors.image
                                    : ""}
                            </label>
                        </p>
                        <br />
                        <p>
                            <label htmlFor="preparation">Preparation:</label>
                            <textarea
                                id="preparation"
                                name="preparation"
                                onBlur={form.handleBlurEvent}
                                onChange={form.handleChangeEvent}
                                placeholder="Add the..."
                                defaultValue={''}
                            />
                        </p>
                        <label className="error">
                            {errors.preparation
                                ? errors.preparation
                                : ""}
                        </label>
                        <p>
                            <input
                                className="btn submit"
                                type="submit"
                                value="Add recipe"
                            />
                        </p>

                    </div >
                </form >
            </section >

        </div >
    );
};

export default CreateDish;