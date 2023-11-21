import { Link, useNavigate } from 'react-router-dom'
import { useFormInputValidation } from "react-form-input-validation";

import * as authService from "../../services/authService";
import { withAuth } from "../../context/AuthContext";


const Register = ({ auth }) => {


    const navigate = useNavigate();

    const [fields, errors, form] = useFormInputValidation({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }, {
        username: "required",
        email: "required|email",
        password: "required",
        confirmPassword: "required",
    })
    console.log(fields);

    const onSubmit = async (e) => {
        e.preventDefault();
        const isValid = await form.validate(e);
        if (isValid) {
            const formData = new FormData(e.target);

            const email = formData.get('email');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');


            if (password !== confirmPassword) {
                return;
            }

            console.log(email)
            console.log(password)
            authService.register(email, password)
                .then(authData => {
                    auth.userLogin(authData);
                    navigate('/');
                });
        }
    }

    return (

        <section id="register-page" className="content auth">
            <form
                id="register"
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
            >
                <div className="register-container">
                    <div />
                    <h1>Register</h1>
                    <p>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onBlur={form.handleBlurEvent}
                            onChange={form.handleChangeEvent}
                            placeholder="petar@email.com"
                        />
                        <label className="error">
                            {errors.email
                                ? errors.email
                                : ""}
                        </label>
                    </p>
                    <p>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onBlur={form.handleBlurEvent}
                            onChange={form.handleChangeEvent}
                            placeholder="delicious101"
                        />
                        <label className="error">
                            {errors.username
                                ? errors.username
                                : ""}
                        </label>
                    </p>
                    <p>
                        <label htmlFor="pass">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="register-password"
                            placeholder="password"
                            onBlur={form.handleBlurEvent}
                            onChange={form.handleChangeEvent}
                            value={fields.password}
                        />
                        <label className="error">
                            {errors.password
                                ? errors.password
                                : ""}
                        </label>
                    </p>
                    <p>
                        <label htmlFor="con-pass">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="repeat password"
                            onBlur={form.handleBlurEvent}
                            onChange={form.handleChangeEvent}
                            value={fields.confirmPassword}
                        />
                        <label className="error">
                            {errors.confirmPassword
                                ? errors.confirmPassword
                                : ""}
                        </label>
                    </p>
                    <p>
                        <input className="btn submit" type="submit" value="Register" />
                    </p>
                    <p className="field">
                        <span>
                            Already Register? Click <Link to="/login">here</Link> to login
                        </span>
                    </p>
                </div>
            </form>
        </section>

    );
};




const RegisterWithAuth = withAuth(Register);

export default RegisterWithAuth;