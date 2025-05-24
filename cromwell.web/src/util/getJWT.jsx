import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const getJWT = () => {
    const cookie = Cookies.get("cromwell-test-user");
    const token = cookie != undefined ? JSON.parse(Cookies.get("cromwell-test-user")) : null;

    const decoded = cookie != undefined ? jwtDecode(token) : null;

    return decoded;
};

export default getJWT;