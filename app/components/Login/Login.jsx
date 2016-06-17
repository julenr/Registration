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
import classNames from 'classnames';

// SASS Stylesheets
import './login.scss';
import './realme.scss';

const Login = (props) => {
    let ErrorClasses = classNames({
        'error': true,
        'hide': !props.RegistrationError
    });
    return (
        <div onKeyPress={(e) => handleKeyPress(e, props)} className="login-content">
            <p className={ ErrorClasses } id="loginErrorBox">
                <span className="octicon octicon-x" onClick={props.clearRegistrationError}></span>
                {props.RegistrationError}
            </p>
            <h2>Business Cover Registration</h2>
            <p>
                This one-time registration will allow you to confirm or update your levy details
                so your cover invoice amount is correct.
                In future you will also be able to access other ACC services through this account.
            </p>
            <div className="form-field">
                <label for="registration-code">ACCESS CODE *</label>
                <input type="text" id="registration-code" name="registration-code" onChange={(elm) => setRegCodeValue(elm, props)} placeholder="Enter access code from your letter" />
            </div>
            <div className="form-field">
                <label for="ird-number">YOUR IRD NUMBER *</label>
                <input type="text" id="ird-number" name="ird-number" minLength="8" maxLength="11" onChange={(elm) => setIrdValue(elm, props)} placeholder="Used for authentication only, not saved" />
            </div>
            <div className="form-field">
                <label for="email">YOUR EMAIL ADDRESS*</label>
                <input type="text" id="email" name="email" onChange={(elm) => setEmailValue(elm, props)} placeholder="Your preferred contact email address"/>
            </div>
            <div className="form-field" id="termsAndConditions">
                <label>
                    <input type="checkbox" id="accept" name="accept" />
                    &nbsp;I accept the&nbsp;
                    <a href="http://www.acc.co.nz/terms-of-use/index.htm" target="_blank">ACC Terms of
                        use</a>&nbsp;
                    <a href="http://www.acc.co.nz/terms-of-use/index.htm" target="_blank"><img
                        src={require('../../assets/images/realme/icon-new-window-blue.png')}
                        alt="ACC Terms of Use"/></a>
                </label>
            </div>
            <h3>Login with RealMe</h3>
            <p>
                You can join RealMe &reg; when you login if you do not already have an account.
            </p>
            <div className="realme_widget">
	            <div className="realme_login_lockup">
		            <img src={require('../../assets/images/realme/logo.png')} width="42" height="41" alt="RealMe" />
		            <div className="realme_btn_margin">
		                <a id="login" href="javascript:void 0" onClick={() => login(props)} className="realme_button">
		                    <span className="realme_button_padding">
		                        Login
		                        <span className="realme_icon_new_window"></span>
		                    </span>
		                    <span className="realme_icon_padlock"></span>
		                </a>
		            </div>
		        </div>
			</div>
            <a id='whatsRealMeLink' href="javascript:void 0" onClick={() => setPanelContent(props, 'WhatsRealMe')}>What's
                RealMe?</a>
        </div>
    );
};

const setPanelContent = (props, content) => {
    props.panelContent(content);
    props.switchPanel();
};

const setEmailValue = (elm, props) => {
    props.setEmailValue(elm.target.value);
};
const setIrdValue = (elm, props) => {
    props.setIrdNumberValue(elm.target.value);
};
const setRegCodeValue = (elm, props) => {
    props.setRegCodeValue(elm.target.value);
};

const handleKeyPress = (e,props) => {
  if( e.key == 'Enter' ) {
    login(props);
  }
};

const login = (props) => {
  // TODO do some validation here
  props.register(props.Register);
};

export default Login;
