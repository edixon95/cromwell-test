import "../assets/css/home.css";
import "../assets/css/auth.css";
import Card from "../components/shared/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import RegisterForm from "../components/auth/RegisterForm";
import validateForm from "../util/validateForm";
import { register } from "../api/user";

const Register = () => {
    const navigate = useNavigate();
    const [registerDetails, setRegisterDetails] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [formStatus, setFormStatus] = useState({
        isCompleted: false,
        errors: null
    });

    const onChange = (target, value) => {
        setRegisterDetails({
            ...registerDetails,
            [target]: value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm(registerDetails, true);
        if (isValid !== true) {
            setFormStatus({
                ...formStatus,
                errors: isValid
            });
            return;
        };

        const isRegistered = await register(registerDetails)
        if (!isRegistered?.message) {
            setFormStatus({
                ...formStatus,
                isCompleted: true
            });
        } else {
            const err = { type: "form", message: isRegistered.message }
            setFormStatus({
                errors: [err]
            });
        };
    };

    const navigationClick = () => {
        navigate("/auth/login");
    };

    useEffect(() => {
        setFormStatus({
            ...formStatus,
            errors: null
        });
    }, [registerDetails]);

    return (
        <div id="homeContainer">
            <Card height="95%">
                <div className="informationDiv">
                    <div className="imageContainer">
                        <div className="teamImage radiusLeft" />
                    </div>
                    <div className="authContainer">
                        <h1 className="textLeftWhite">Register</h1>
                        <RegisterForm
                            formValue={registerDetails}
                            onChange={onChange}
                            onSubmit={onSubmit}
                            navigationClick={navigationClick}
                            isCompleted={formStatus.isCompleted}
                            errors={formStatus.errors}
                        />

                    </div>
                </div>
            </Card>
        </div>
    )
};

export default Register;