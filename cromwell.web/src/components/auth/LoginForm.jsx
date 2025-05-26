import Input from "../shared/Input";
import Label from "../shared/Label";
import "../../assets/css/form.css";
import Button from "../shared/Button";
import parseError from "../../util/parseError";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.onSubmit} className="formContainer">
            <div className="inputContainer">
                <div>
                    <Label htmlFor="email">Email</Label>
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
                    <span className="formError"> {parseError(props.errors, "password")}</span>
                </div>
            </div>
            <div className="buttonContainer">
                <span className="formError">{parseError(props.errors, "form")}</span>
                <Button
                >
                    Login
                </Button>
                <p>Don't have an account? <span className="signUpClick" onClick={props.navigationClick}><u>Sign up</u></span></p>
            </div>
        </form>
    )
};

export default LoginForm;