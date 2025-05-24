import { useSelector } from "react-redux";
import Card from "../components/shared/Card";
import UserPanel from "../components/portal/UserPanel";
import UserTable from "../components/portal/UserTable";
import { useState, useEffect } from "react"
import { changePassword, deleteUser, getUser } from "../api/user";
import Modal from "../components/shared/Modal";
import Button from "../components/shared/Button";
import PasswordForm from "../components/portal/PasswordForm";
import validateForm from "../util/validateForm";
import getJWT from "../util/getJWT";

const Landing = () => {

    const { _id, username } = useSelector(state => state.user);
    const [userList, setUserList] = useState()
    const [modalState, setModalState] = useState({
        isOpen: false,
        id: null,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        errors: null

    });
    const closeModal = () => setModalState({
        isOpen: false,
        id: null,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        errors: null
    });

    const handleGetUsers = async () => {
        const users = await getUser();

        setUserList(users);
    };

    useEffect(() => {
        handleGetUsers();
    }, []);

    const handleDeleteUserClicked = (id) => {
        setModalState({
            isOpen: true,
            id: id,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            errors: null
        });
    };

    const handleDeleteUser = async () => {
        const isDeleted = await deleteUser(modalState.id)

        if (isDeleted) {
            handleGetUsers();
            closeModal();
        };
    };

    const onChange = (field, value) => {
        setModalState({
            ...modalState,
            [field]: value
        });
    };

    const handleChangePasswordClicked = () => {
        setModalState({
            ...modalState,
            isOpen: true
        });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const isValid = validateForm(modalState, false, true);
        if (isValid !== true) {
            setModalState({
                ...modalState,
                errors: isValid
            });
            return;
        };

        const passwordObject = {
            id: getJWT().id,
            oldPassword: modalState.oldPassword,
            newPassword: modalState.newPassword
        };

        const isChanged = await changePassword(passwordObject);

        if (isChanged === "Old password does not match the account" || isChanged === "Old password is incorrect") {
            const err = { type: "form", message: isChanged }
            setModalState({
                ...modalState,
                errors: [err]
            });
        } else if (isChanged) {
            closeModal();
        };

    };

    useEffect(() => {
        setModalState({
            ...modalState,
            errors: null
        });
    }, [modalState.newPassword, modalState.confirmPassword, modalState.oldPassword]);

    return (
        <>
            {modalState.isOpen &&
                <Modal close={closeModal}>
                    {
                        modalState.id ?
                            <div className="deleteModal">
                                <span>Are you sure you want to delete this user</span>
                                <div className="buttonContainer buttonRow">
                                    <Button onClick={closeModal}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleDeleteUser}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            :
                            <div className="changePasswordModal">
                                <PasswordForm
                                    formValue={modalState}
                                    onChange={onChange}
                                    cancel={closeModal}
                                    errors={modalState.errors}
                                    onSubmit={handleChangePassword}
                                />
                            </div>
                    }
                </Modal>
            }
            <div id="portalScreenContainer">
                <Card height="95%">
                    <div id="portalContent">
                        <div>
                            <UserPanel
                                username={username}
                                id={_id}
                                handleChangePasswordClicked={handleChangePasswordClicked}
                            />
                        </div>
                        <div>
                            <UserTable
                                userList={userList}
                                selfId={_id}
                                handleDeleteUserClicked={handleDeleteUserClicked}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
};

export default Landing;