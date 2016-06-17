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
import './levysearchresultitem.scss';

const LevySearchResultItem = (props) => {
    let ItemClasses = classNames({
        'result-item input-plus-button-wrapper': true,
        'not-expanded': !props.expanded//,
        // 'hide': props.important // This line is to hide the "not for self employed" results from the list
    });
    let ChevronClasses = classNames({
        'input-plus-button-icon octicon': true,
        'octicon-chevron-up': props.expanded,
        'octicon-chevron-down': !props.expanded
    });
    let ButtonStyles = classNames({
        'form-field' : true,
        'center' : true,
        'searchCUSelectButton': true, //just for tagging
        'hide': props.important
    });

    return (
        <div id={'resultItem-'+props.idx} className={ ItemClasses } key={props.idx}>
            <div className="title"><strong>{props.desc}</strong></div>
            <a href="javascript:void 0" id={`item${props.idx}`} className={ ChevronClasses }
               onClick={() => props.toggleResultItem(props.code)}>
            </a>
            <p className="important-p">
                {props.important ? <span className="octicon octicon-alert important"></span> : ''}
                {props.important ? <span className="important"><strong>&nbsp;{props.important}</strong></span> : ''}
            </p>
            <p>
                <strong>Business Industry Code: <span className="bic">{props.code}</span></strong>
                <br />
                <span className="definition">{props.definitionPlainText}</span>
            </p>
            <p>
                {props.bicrefs.length > 0 ? "Other codes to consider:" : ''}
                <ul>
                {
                    props.bicrefs.map((item,idx) => {
                        return (<ResultAlt {...item} key={idx} idx={idx}
                            searchCUByID={props.searchCUByID}
                            panelContent={props.panelContent}
                            BICHost={props.BICHost}
                        />);
                    })
                }
                </ul>
            </p>
            <p className="input-plus-button-box">
                <strong>Classification Unit (CU): <span className="cu-code">{props.cu.code}</span></strong>
                <br />
                <span className="cu-description">{props.cu.desc}</span>
            </p>
            <p>This is used by ACC to calculate your levies.</p>
            <div className={ButtonStyles}>
                <button id={'select-' + props.idx} className="acc-button" onClick={() => selectItem(props)}>
                    Select this classification
                </button>
            </div>
            <a href="javascript: void 0" className={'showResultList'} onClick={() => props.toggleResultItem(props.code)}>
                Show result list
            </a>
        </div>
    );
};

var initialProps;

const ResultAlt = (props) => {
    initialProps = props;
    if (props.refs){
        return (
            <li key={props.idx} className={'altCode-'+props.idx}>
                {wrapVariables(props)}
            </li>
        );
    } else {
        return null;
    }
};

const selectItem = (props) => {
    props.replaceCurrentCU(props.cu.code);
    props.switchPanel();
};

const wrapVariables = (props) => {
    var outcome = [];
    outcome.push(props.desc);
    if (props.refs[0]) {
        var temp = outcome.pop();
        outcome.push(...flatMap(temp.split('#$0'), (part) => { return [part,<a href="javascript: void 0" className={'link'} onClick={() => searchFromLink(props.refs[0])}>{props.refs[0].desc}</a>];}));
        outcome.pop(); //remove last link
    }
    if (props.refs[1]) {
        temp = outcome.pop();
        outcome.push(...flatMap(temp.split('#$1'), (part) => { return [part,<a href="javascript: void 0" className={'link'} onClick={() => searchFromLink(props.refs[1])}>{props.refs[1].desc}</a>];}));
        outcome.pop(); //remove last link
    }

    // Better option but the onClick doesn't work for unknown reasons
    // var i;
    // for (var i=0; i < (props.refs.length); i++) {
    //     if (props.refs[i]) {
    //         console.log(props.refs[i]);
    //         var temp = outcome.pop();
    //         outcome.push(...flatMap(temp.split('#$'+i), (part) => { return [part,<a href="javascript: void 0" onClick={() => searchFromLink(props.refs[i])}>{props.refs[i].desc}</a>];}));
    //         outcome.pop(); //remove last link
    //     }
    // }

    return outcome;
};

const searchFromLink = (props) => {
    initialProps.searchCUByID(props.id, initialProps.BICHost);
    initialProps.panelContent('LevySearchResults');
};

function flatMap(array, fn) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var mapping = fn(array[i]);
        result = result.concat(mapping);
    }
    return result;
}
export default LevySearchResultItem;
