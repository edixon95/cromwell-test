import Logo from "/assets/images/sah-logo.png";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";

const SiteNav = () => {
    const navigate = useNavigate();

    const navigateTo = (page) => {
        navigate(page);
    };

    return (
        <div id="siteNav">
            <div className="siteNavMainContent">
                <div className="siteNavImageContainer">
                    <img src={Logo}
                        onClick={() => navigateTo("/")}
                    />
                </div>
                <div>
                    <Button
                        variant={"clearWhite"}
                        onClick={() => navigateTo("/")}
                    >
                        Home
                    </Button>
                </div>
            </div>
            <div>
                <Button
                    variant={"confirm"}
                    onClick={() => navigateTo("/auth")}
                >
                    Login
                </Button>
            </div>
        </div>
    )
};

export default SiteNav;