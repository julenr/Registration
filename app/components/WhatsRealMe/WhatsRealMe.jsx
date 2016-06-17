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
import './whatsRealMe.scss';

const WhatsRealMe = (props) => {
    return (
        <div className='whatrealme-container'>
            <div className="sub-header" id="whatsRealMePanel">
                <a href="javascript: void 0" className="chevron octicon octicon-chevron-left"
                   onClick={props.switchPanel}/>
                What is RealMe?
            </div>
            <div className="whatrealme-body">
                <h2 className='realme_popup_title'>To login to this service you now need a RealMe account.</h2>
                <p>
                    <b>RealMe</b> is a service from the New Zealand government and New Zealand Post that includes a
                    single login, letting you use one username and password to access a wide range of services online.
                </p>
                <p>
                    But there is much more to <b>RealMe</b> than just the convenience of a single login.
                </p>
                <h2 className='realme_popup_title'>Get Verified</h2>
                <p>
                    <b>RealMe</b> is also your secure online ID. Verify your <b>RealMe</b> account and use it to prove
                    who you are online. This lets you to do lots of useful things over the internet that would normally
                    require you to turn up in person.&nbsp;
                </p>
                <p>
                    <a className='' target='_blank' href='http://www.realme.govt.nz'>
                        Find out more
                    </a>&nbsp;
                    <a className='' target='_blank' href='http://www.realme.govt.nz'>
                        <img src={require('../../assets/images/realme/icon-new-window-blue.png')} alt="RealMe"/>
                    </a>
                </p>
            </div>
        </div >
    );
};

export default WhatsRealMe;
