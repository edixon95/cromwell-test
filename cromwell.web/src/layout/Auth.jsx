import { Outlet } from "react-router-dom";
import AuthNav from "../components/nav/AuthNav";
import "../assets/css/siteNav.css"

const Auth = () => {
    return (
        <div id="siteLayout">
            <AuthNav />
            <div id="siteContainer">
                <Outlet />
            </div>
        </div>
    )
};

export default Auth;