import "../assets/css/home.css";
import "../assets/css/auth.css";
import LoginForm from "../components/auth/LoginForm";
import Card from "../components/shared/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validateForm from "../util/validateForm";
import { login, getUser } from "../api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";
import Cookies from "js-cookie";
import handleUserCookies from "../util/handleUserCookies";
import getJWT from "../util/getJWT";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });
    const [formStatus, setFormStatus] = useState({
        errors: null
    });

    const onChange = (target, value) => {
        setLoginDetails({
            ...loginDetails,
            [target]: value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm(loginDetails, false)
        if (isValid !== true) {
            setFormStatus({
                errors: isValid
            });
            return;
        };

        const isLoggedIn = await login(loginDetails)

        if (isLoggedIn?.message) {
            const err = { type: "form", message: isLoggedIn.message }
            setFormStatus({
                ...formStatus,
                errors: [err]
            });
            return;
        };

        if (isLoggedIn) {
            dispatch(setUser(isLoggedIn));
            navigate("/portal");
        };

    };

    const navigationClick = () => {
        navigate("/auth/register");
    };

    const userHasCookies = async () => {
        const getCookies = Cookies.get("cromwell-test-user") ? JSON.parse(Cookies.get("cromwell-test-user")) : false;
        if (!getCookies) return;

        const isValid = handleUserCookies();
        if (isValid) {
            const userId = getJWT().id;
            const user = await getUser(userId);

            dispatch(setUser(user));
            navigate("/portal");
        } else {
            navigate("/auth/login");
        };
    };

    useEffect(() => {
        userHasCookies();
    }, [])

    useEffect(() => {
        setFormStatus({
            ...formStatus,
            errors: null
        });
    }, [loginDetails])

    return (
        <div id="homeContainer">
            <Card height="80%">
                <div className="informationDiv">
                    <div className="imageContainer">
                        <div className="singleImage radiusLeft" />
                    </div>
                    <div className="authContainer">
                        <h1 className="textLeftWhite">Login</h1>
                        <LoginForm
                            formValue={loginDetails}
                            onChange={onChange}
                            onSubmit={onSubmit}
                            navigationClick={navigationClick}
                            errors={formStatus.errors}
                        />

                    </div>
                </div>
            </Card>
        </div>
    )
};

export default Login;