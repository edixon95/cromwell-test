import { Outlet } from "react-router-dom";
import SiteNav from "../components/nav/SiteNav";
import "../assets/css/siteNav.css";

const Site = () => {
    return (
        <div id="siteLayout">
            <SiteNav />
            <div id="siteContainer">
                <Outlet />
            </div>
        </div>
    )
};

export default Site;