//
//
//              Created by
//            __ _____ __    _____ _____    _____ _____    __ _____
//         __|  |  |  |  |  |   __|   | |  | __  |     |__|  |     |
//        |  |  |  |  |  |__|   __| | | |  |    -|  |  |  |  |  |  |
//        |_____|_____|_____|_____|_|___|  |__|__|_____|_____|_____|
//
//                on 02/05/2016
//                   isusk246@gmail.com
//
//


import React from 'react';

// SASS Stylesheets
import './login.scss';

const Login = (props) => {
    return (
        <div className="login-content">
            <h2>Business Cover Registration</h2>
            <p>
                <a href="javascript:void 0" onClick={() => setPanelContent(props, 'ACCCover')}>ACC business cover</a>&nbsp;
                is one of your most important business assets. We provide you with 24/7,
                no-fault personal injury cover, and you can only purchase it from ACC.
            </p>
            <p>
                Registering lets you check your details and make you are charged the right
                levy for your business.
            </p>
            <div className="form-field">
                <label for="registration-code">REGISTRATION CODE</label>
                <input type="text" name="registration-code" />
            </div>
            <div className="form-field">
                <label for="email">EMAIL</label>
                <input type="text" name="email" />
            </div>
            <div className="form-field">
                <label>
                    <input type="checkbox" name="accept" />
                    I accept the ACC&nbsp;
                    <a href="javascript:void 0" onClick={() => setPanelContent(props, 'TermsOfUse')}>Terms of use</a>
                </label>
            </div>
            <div className="form-field center">
                <button className="acc-button" onClick={() => props.checkLogin()}>Login</button>
            </div>
        </div>
    );
};

const setPanelContent = (props, content) => {
    props.panelContent(content);
    props.switchPanel();
};

export default Login;
