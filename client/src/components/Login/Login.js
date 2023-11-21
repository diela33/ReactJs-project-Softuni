import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../context/AuthContext";
import * as authService from "../../services/authService";

import { useFormInputValidation } from "react-form-input-validation";

const Login = () => {
    const [fields, errors, form] = useFormInputValidation({
        email: "",
        password: "",
    }, {
        email: "required|email",
        password: "required",
    });

    console.log(fields);


    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const isValid = await form.validate(e);
        if (isValid) {

            const {
                email,
                password,
            } = Object.fromEntries(new FormData(e.target));

            authService.login(email, password)
                .then(authData => {
                    userLogin(authData);
                    navigate('/');
                });
        }

    }

return (
    < section id="login-page" className="auth" >
        <form id="login"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}>
            <div className="login-container">
                <div />
                <h1>Login</h1>
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
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password"
                        id="login-password"
                        name="password"
                        onBlur={form.handleBlurEvent}
                        onChange={form.handleChangeEvent}
                        placeholder="password"
                    />
                    <label className="error">
                        {errors.password
                            ? errors.password
                            : ""}
                    </label>
                </p>
                <input type="submit" className="btn submit" value="Login" />
                <p className="field">
                    <span>
                        Click <Link to="/register">here</Link> if you don't have profile
                    </span>
                </p>
            </div>
        </form>
    </section >
);
};

export default Login;