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
import './header.scss';

const Header = (props) => {
    return (
        <div id="header">
            <div className="header-content">
                <img src={require('../../assets/images/acc-logo-mobile.png')} width="100" height="48" alt="ACC logo" />
            </div>
        </div>
    );
};

export default Header;
