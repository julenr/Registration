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
                <div className="footer-link"><a href="javascript:void 0" onClick={() => setPanelContent(props, 'TermsOfUse')}>Terms of use</a>&nbsp;&nbsp;</div>
                <div className="footer-link"><a href="javascript:void 0">Privacy Notice</a>&nbsp;&nbsp;</div>
                <div className="footer-link"><a href="javascript:void 0">&copy;&nbsp;Disclaimer and Copyright</a>&nbsp;&nbsp;</div>
                <div className="footer-link"><a href="javascript:void 0">Contact Us</a>&nbsp;&nbsp;</div>
                {
                    props.LoggedIn ?
                        <a href="javascript:void 0" onClick={() => props.logout()}>
                          Logout
                        </a>
                    :
                        null
                }
            </div>
        </div>
    );
};

const setPanelContent = (props, content) => {
    props.panelContent(content);
    props.switchPanel();
};

export default Footer;
