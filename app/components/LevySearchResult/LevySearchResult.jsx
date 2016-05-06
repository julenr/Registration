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
import './levysearchresult.scss';

const LevySearchResult = (props) => {
    return (
        <div className="levy-wrapper">
            <div className="sub-header">
                <a href="javascript: void 0" className="chevron fa fa-chevron-left" onClick={() => props.panelContent('LevySearch')}/>
                ACC Levy Classification (CU)
            </div>
            {
                (props.Searching) ?
                    <div className='refreshing-container'>
                        <span className="search-spin fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></span>
                        <span className="sr-only">Refreshing...</span>
                    </div>
                :
                <div className="levy-search-content">
                    <div className="searchHeader">
                        Search Results for <strong>'{props.SearchCUValue}'</strong><br />
                    Showing {props.SearchResults.length} Results &nbsp;-&nbsp;&nbsp;
                        <a href="javascript: void 0" onClick={() => props.panelContent('LevySearch')}>
                            Search Again
                        </a>
                    </div>
                    <div className="search-items-content">
                        {
                            props.SearchResults.map((item, idx) => {
                                return (<ResultItem {...item} key={idx} idx={idx}
                                    toogleResultItem={props.toogleResultItem}
                                    panelContent={props.panelContent}
                                    setCurrentCU={props.setCurrentCU}
                                    switchPanel={props.switchPanel}
                                    />);
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );
};

const ResultItem = (props) => {
    let ItemClasses = classNames({
        'result-item input-plus-button-wrapper': true,
        'not-expanded': !props.expanded
    });
    let ChevronClasses = classNames({
        'input-plus-button-icon fa': true,
        'fa-chevron-up': props.expanded,
        'fa-chevron-down': !props.expanded
    });
    return (
        <div className={ ItemClasses } key={props.idx}>
            <div className="title"><strong>{props.title}</strong></div>
            <a href="javascript:void 0" id={`item${props.idx}`} className={ ChevronClasses }
                onClick={() => props.toogleResultItem(props.CU.code)}>
            </a>
            <p>
                <strong>Business Industry Code: {props.BIC.code}</strong>
                <br />
                {props.BIC.description}
            </p>
            <p>
                <strong>Classification Unit (CU): {props.CU.code}</strong>
                <br />
                {props.CU.description}
            </p>
            <p>This is used by ACC to calculate your levies.</p>
            <div className="form-field center">
                <button className="acc-button" onClick={() => selectItem(props)}>
                    Select this classification
                </button>
            </div>
            <a href="javascript: void 0" onClick={() => props.panelContent('LevySearch')}>
                Back to results
            </a>
        </div>
    );
};

const selectItem = (props) => {
    props.setCurrentCU(props.CU.code);
    props.switchPanel();
};

export default LevySearchResult;
