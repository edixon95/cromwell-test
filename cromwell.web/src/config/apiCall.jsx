import apiConfig from "./apiConfig";
import Cookies from "js-cookie";

const apiCall = async (url, method = "post", data = null) => {
    const cookies = Cookies.get("cromwell-test-user");
    let token;
    if (cookies) {
        token = JSON.parse(cookies);
    } else {
        token = null;
    };

    const headers = {
        Authorization: token ? `Bearer ${token}` : null,
        "Content-Type": "application/json",
    };

    const payload = {
        method: method,
        headers
    };

    if (data)
        payload.body = JSON.stringify(data);

    const fullEndpoint = apiConfig.base_url + url;
    const response = await fetch(fullEndpoint, payload);
    const result = await response.json();

    return {
        status: response.status,
        result
    };
};

export default apiCall;