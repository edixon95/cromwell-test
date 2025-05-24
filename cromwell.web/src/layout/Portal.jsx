import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setIsChecking, setUser } from "../reducers/userSlice";
import handleUserCookies from "../util/handleUserCookies";
import PortalNav from "../components/nav/PortalNav";
import "../assets/css/portalNav.css";
import BurgerIcon from "/assets/images/burger-icon.png";
import getJWT from "../util/getJWT";
import { getUser } from "../api/user";

const Portal = () => {
    const dispatch = useDispatch();
    const { isChecking, isLoggedIn } = useSelector(state => state.user);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded(!isExpanded);

    const handleCheckUser = async () => {
        if (!isLoggedIn) {
            const isValid = await handleUserCookies();
            if (!isValid) {
                dispatch(logoutUser());
            } else {
                const userId = getJWT().id;
                const user = await getUser(userId);

                dispatch(setUser(user));
            }
        }

        dispatch(setIsChecking(false));
    };

    useEffect(() => {
        handleCheckUser();
    }, []);

    if (isChecking)
        return null;

    if (!isLoggedIn)
        return <Navigate to="/auth/login" replace />;

    return (
        <div id="portalContainer">
            <div className="burger">
                <img src={BurgerIcon} onClick={toggleExpanded} />
            </div>
            <PortalNav isExpanded={isExpanded} toggle={toggleExpanded} />
            <Outlet />
        </div>
    )
};

export default Portal;