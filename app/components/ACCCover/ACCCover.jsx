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
import './acccover.scss';

const ACCCover = (props) => {
    return (
        <div className="acc-cover-container">
            <div className="sub-header" id="BICPanel">
                <a href="javascript: void 0" className="chevron octicon octicon-chevron-left"
                   onClick={props.switchPanel}/>
                What is a business industry classification (BIC) code?
            </div>
            < div className="acc-cover">
                <p>
                    A BIC code is a way of classifying a business or self-employed individual by the main activity they
                    are involved in. ‘Activity’ means the external service rendered or product produced by a business
                    or, for self-employed individuals, the nature of the work undertaken. The BIC code that most
                    accurately describes the nature of their business or trading activity must be chosen.
                </p>
                <p>
                    ACC uses BIC codes to determine classification units (CUs). Every business and self-employed
                    individual has a CU based on their activity. ACC groups similar businesses and self-employed
                    individuals this way to make sure that levies are fair, and to ensure that the costs of claims are
                    shared fairly among the industries responsible for those costs.
                </p>
                <a className='find_out_more' target='_blank'
                   href='https://www.businessdescription.co.nz/help/'>Find out more</a>&nbsp;<a
                className='find_out_more' target='_blank'
                href='https://www.businessdescription.co.nz/help/'><img
                    src={require('../../assets/images/realme/icon-new-window-blue.png')}
                    alt="www.businessdescription.co.nz"/></a>
            </div>
        </div>
    );
};

export default ACCCover;
