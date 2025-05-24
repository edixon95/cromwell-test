const apiConfig = {
    base_url: "http://localhost:5000",

    User: {
        Register: "/user/register",
        Login: "/user/login",
        GetAll: "/user/getAll",
        GetSingle: "/user/getSingle",
        Delete: "/user/delete",
        ChangePassword: "/user/changePassword",
        RefreshToken: "/user/refreshToken"
    }
};

export default apiConfig;