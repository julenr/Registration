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
import './panel.scss';


function Panel (props) {
    let PanelClasses = classNames(props.className, {
        'panel': true,
        'active': props.PanelActive
    });
    let MaskClasses = classNames({
        'panel-mask': true,
        'active': props.PanelActive
    });
    return (
      <span>
        <div className={ MaskClasses } onClick={ props.maskPanelClick } />
        <nav className={ PanelClasses }>
          {props.children}
        </nav>
      </span>
    );
}

export default Panel;
