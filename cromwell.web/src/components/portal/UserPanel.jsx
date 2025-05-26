import Button from "../shared/Button";

const UserPanel = (props) => {
    return (
        <div id="userPanel">
            Logged in as: {props.username}
            <Button
                onClick={props.handleChangePasswordClicked}
            >
                Change password
            </Button>
        </div>
    )
};

export default UserPanel;