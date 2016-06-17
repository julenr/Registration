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
import './footer.scss';

const Footer = (props) => {
    return (
        <div id="footer">
            <div className="footer-content">
                <div className="footer-link">
                    <a href="http://www.acc.co.nz/terms-of-use/index.htm" target="_blank">Terms of use</a>&nbsp;&nbsp;
                </div>
                <div className="footer-link">
                    <a href="http://www.acc.co.nz/privacy/privacy-notice/WPC133788" target="_blank">Privacy
                        Notice</a>&nbsp;&nbsp;
                </div>
                <div className="footer-link">
                    <a href="http://www.acc.co.nz/disclaimer-and-copyright/index.htm" target="_blank">&copy;&nbsp;
                        Disclaimer and Copyright</a>&nbsp;&nbsp;</div>
                <div className="footer-link">
                    <a href="http://www.acc.co.nz/contact-us-and-feedback/send-us-your-feedback"
                       target="_blank">Feedback</a>&nbsp;&nbsp;</div>
                <div className="footer-link">
                    <a href="http://www.acc.co.nz/contact-us-and-feedback/index.htm" target="_blank">Contact
                        Us</a>&nbsp;&nbsp;
                </div>
                {
//                    props.LoggedIn ?
//                        <div className="footer-link">
//                            <a href="javascript:void 0" onClick={() => props.logout()}>
//                                Logout
//                            </a>
//                        </div>
//                    :
//                        null
                }
            </div>
            <div className="footer-content">
                <div className="govt-footer-link">
                    For more information on government services go to &#8203;
                    <a href="http://www.govt.nz"
                       title="newzealand.govt.nz - connecting you to New Zealand central &amp; local government services"
                       target="_blank">
                        <img src={require('../../assets/images/govt-logo.png')} width="150px" height="15px"></img>
                    </a>
                </div>
            </div>
        </div>
    );
};

const setPanelContent = (props, content) => {
    props.panelContent(content);
    props.switchPanel();
};

export default Footer;
