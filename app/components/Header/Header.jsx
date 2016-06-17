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
        <div className="header">
            <div className="header-content logo">
                <h1>{props.PageHeader}</h1>
            </div>
        </div>
    );
};

export default Header;
