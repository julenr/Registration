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
import './levysearchresults.scss';

import LevySearchResultItem from '../LevySearchResultItem';

const LevySearchResults = (props) => {
    return (
        <div className="levy-wrapper">
            <div className="sub-header" id="searchCUResultSubHeader">
                <a href="javascript: void 0" className="chevron octicon octicon-chevron-left" onClick={() => props.panelContent('LevySearch')}/>
                ACC Levy Classification (CU)
            </div>
            {
                (props.Searching) ?
                    <div className='refreshing-container'>
                        <span className="search-spin" aria-hidden="true"></span>
                    </div>
                :
                <div className="levy-search-content">
                    <div className="searchHeader" id="searchCUResultInfoHeader">
                        Search Results for <strong>'{props.SearchCUValue}'</strong><br />
                    Showing <span id="resultCount">{props.SearchResults.length}</span> Results &nbsp;-&nbsp;&nbsp;
                        <a href="javascript: void 0" onClick={() => props.panelContent('LevySearch')}>
                            Search Again
                        </a>
                    </div>
                    <div className="search-items-content" id="searchCUResultCards">
                        {
                            props.SearchResults.map((item, idx) => {
                                return (<LevySearchResultItem {...item} key={idx} idx={idx}
                                    toggleResultItem={props.toggleResultItem}
                                    panelContent={props.panelContent}
                                    replaceCurrentCU={props.replaceCurrentCU}
                                    switchPanel={props.switchPanel}
                                    searchCUByID={props.searchCUByID}
                                    BICHost={props.BICHost}
                                />);
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default LevySearchResults;
