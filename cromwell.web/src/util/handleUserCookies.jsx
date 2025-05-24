import Cookies from "js-cookie";
import { refreshToken } from "../api/user";

const verifyAndReplaceCookies = async () => {
    const userCookies = Cookies.get("cromwell-test-user");
    const token = userCookies ? JSON.parse(userCookies) : null;

    let IsRefreshed = false;
    if (token) {
        const newToken = await refreshToken();
        if (newToken.status === 200) {
            Cookies.set("cromwell-test-user", JSON.stringify(newToken.result.token));
            IsRefreshed = true;
        };
    };

    return IsRefreshed;

};

const handleUserCookies = async () => {
    const isRefreshed = await verifyAndReplaceCookies();
    if (!isRefreshed) {
        Cookies.remove("cromwell-test-user");
    };

    return isRefreshed;
};

export default handleUserCookies;