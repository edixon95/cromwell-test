import Input from "../shared/Input";
import Label from "../shared/Label";
import "../../assets/css/form.css";
import Button from "../shared/Button";
import parseError from "../../util/parseError"

const RegisterForm = (props) => {

    if (props.isCompleted)
        return (
            <div className="formContainer">
                <div className="buttonContainer">
                    <p>You're all signed up, click below to log in</p>
                    <Button
                        onClick={props.navigationClick}
                    >
                        Login
                    </Button>
                </div>
            </div>
        )

    return (
        <form onSubmit={props.onSubmit} className="formContainer">
            <div className="inputContainer">
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        name="username"
                        onChange={(e) => props.onChange("username", e.target.value)}
                        value={props.formValue.username}
                    />
                    <span className="formError">{parseError(props.errors, "username")}</span>
                </div>

                <div>
                    <Label htmlFor="username">Email</Label>
                    <Input
                        name="email"
                        onChange={(e) => props.onChange("email", e.target.value)}
                        value={props.formValue.email}
                    />
                    <span className="formError">{parseError(props.errors, "email")}</span>
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name="password"
                        onChange={(e) => props.onChange("password", e.target.value)}
                        value={props.formValue.password}
                        type="password"
                    />
                    <span className="formError">{parseError(props.errors, "password")}</span>
                </div>

                <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        name="confirmPassword"
                        onChange={(e) => props.onChange("confirmPassword", e.target.value)}
                        value={props.formValue.confirmPassword}
                        type="password"
                    />
                    <span className="formError">{parseError(props.errors, "confirmPassword")}</span>
                </div>
            </div>
            <div className="buttonContainer">
                <span className="formError">{parseError(props.errors, "form")}</span>
                <Button
                >
                    Register
                </Button>
                <p>Already have an account? <span className="signUpClick" onClick={props.navigationClick}><u>Login</u></span></p>
            </div>
        </form>
    )
};

export default RegisterForm;