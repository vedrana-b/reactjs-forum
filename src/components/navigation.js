import React, { useState } from "react";
import SignUp from "./sign-up";
import LogIn from "./login";
import * as authService from "../services/auth.service";


const Navigation = () => {
    const [loginStatus, setLoginStatus] = useState(authService.isLoggedIn());

    const loginHandler = () => {
        setLoginStatus(authService.isLoggedIn());
    }

    const logOut = () => {
        authService.logout();
        setLoginStatus(authService.isLoggedIn());
    }

    return (
        <React.Fragment>
            {loginStatus &&
                <h5 className="ui header avatar-header">
                    <img src={process.env.PUBLIC_URL + '/unknown.png' } className="ui circular image" />
                    {authService.getUser()}
                </h5> }
            <LogIn isLoggedOut={logOut} isLogged={loginStatus} onLogin={loginHandler} />
            <SignUp isLogged={loginStatus} />
        </React.Fragment>
    )
}

export default Navigation;