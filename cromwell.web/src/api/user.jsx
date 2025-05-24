import Cookies from "js-cookie";
import apiConfig from "../config/apiConfig";
import apiCall from "../config/apiCall";

const register = async (user) => {
    const response = await apiCall(
        apiConfig.User.Register,
        "post",
        user
    );

    if (response.status === 200)
        return true;

    return response.result;
};

const login = async (user) => {
    const response = await apiCall(
        apiConfig.User.Login,
        "post",
        user
    );

    if (response.status === 200) {
        Cookies.set("cromwell-test-user", JSON.stringify(response.result.token));
        return response.result.user;
    };

    return response.result;
};

const getUser = async (id = null) => {
    let response

    if (id) {
        response = await apiCall(
            apiConfig.User.GetSingle + `?id=${id}`,
            "get"
        );
    } else {
        response = await apiCall(
            apiConfig.User.GetAll,
            "get"
        );

    };

    return response.result;
};

const deleteUser = async (id) => {
    const response = await apiCall(
        apiConfig.User.Delete + `?id=${id}`,
        "delete"
    );

    if (response.status === 200)
        return true;

    return false;

};

const changePassword = async (changePasswordObject) => {
    const response = await apiCall(
        apiConfig.User.ChangePassword,
        "put", changePasswordObject
    );

    if (response.status === 200)
        return true;

    if (response.status === 401)
        return "Old password does not match the account"

    return false;
}

const refreshToken = async () => {
    const response = await apiCall(
        apiConfig.User.RefreshToken,
        "post"
    );

    return response;
};

export { register, login, getUser, deleteUser, changePassword, refreshToken };