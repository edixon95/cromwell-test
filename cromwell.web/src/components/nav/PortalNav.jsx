import Logo from "/assets/images/sah-logo.png";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../reducers/userSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const PortalNav = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navigateTo = (page) => {
        navigate(page);
    };

    const handleLogout = () => {
        Cookies.remove("cromwell-test-user");
        dispatch(logoutUser());
        navigate("/auth");
    };

    return (
        <div id="portalNav" className={`${props.isExpanded && "forceShow"}`}>
            <div className="siteNavImageContainer">
                <img src={Logo}
                    onClick={() => navigateTo("/")}
                />
            </div>
            <div id="portalLinks">
                {/*Portal links would go here*/}
            </div>

            <div id="portalButtons">

                <Button
                    variant={"confirm"}
                    onClick={() => navigateTo("/")}
                >
                    Back to site
                </Button>

                <Button
                    variant={"confirm"}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
};

export default PortalNav;