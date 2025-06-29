import Input from "../shared/Input";
import Label from "../shared/Label";
import "../../assets/css/form.css";
import Button from "../shared/Button";
import parseError from "../../util/parseError";

const PasswordForm = (props) => {
    return (
        <form onSubmit={props.onSubmit} className="formContainer">
            <div className="inputContainer">

                <div>
                    <Label htmlFor="oldPassword">Old Password</Label>
                    <Input
                        name="oldPassword"
                        onChange={(e) => props.onChange("oldPassword", e.target.value)}
                        value={props.formValue.oldPassword}
                        type="password"
                    />
                    <span className="formError">{parseError(props.errors, "oldPassword")}</span>
                    
                </div>

                <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                        name="newPassword"
                        onChange={(e) => props.onChange("newPassword", e.target.value)}
                        value={props.formValue.newPassword}
                        type="password"
                    />
                    <span className="formError">{parseError(props.errors, "newPassword")}</span>
                    
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
                <span className="formError"> {parseError(props.errors, "form")}</span>
               
                <div className="buttonContainer buttonRow">
                    <Button
                        variant={"inverse"}
                        onClick={props.cancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={props.onSubmit}
                    >
                        Change Password
                    </Button>
                </div>
            </div>
        </form>
    )
};

export default PasswordForm;