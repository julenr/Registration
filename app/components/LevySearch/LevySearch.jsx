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
import './levysearch.scss';

const LevySearch = (props) => {
    return (
        <div className="levy-wrapper">
            <div className="sub-header" id="searchCUSubHeader">
                <a href="javascript: void 0" className="chevron octicon octicon-chevron-left" onClick={props.switchPanel}/>
                ACC Levy Classification (CU)
            </div>
            <div className="levy-content" id="searchCUBody">
                <p>
                    Your ACC Levy Classification (CU) is defined by your Business industry description
                    (BIC) and determines the rate you will pay in levies. The rates vary depending on your
                    industry and are higher for higher risk businesses.
                </p>
                <p>
                    Your current CU is:<br />
                    <strong>{`${props.LevyClassificationCode} - ${props.LevyClassificationDescription}`}</strong>
                </p>
                <div className="form-field input-plus-button-wrapper">
                    <label id="searchCUSearchBoxLabel" for="searchCUSearchBox">SEARCH FOR YOUR BUSINESS DESCRIPTION</label>
                    <input className="input-plus-button-box" type="text"
                        onChange={(elm) => setSearchCUValue(elm, props) }
                        onKeyPress={(e) => enterSearchCU(e, props)}
                        id="searchCUSearchBox" name="acc-levy-classification" placeholder="Enter keyword or code"
                        defaultValue={props.SearchCUValue}
                    />
                    <a href="javascript:void 0" id="cu-search" className="input-plus-button-icon octicon octicon-search"
                        onClick={() => searchCU(props)}>
                    </a>
                </div>
                <p>
                    Describe the goods or services the business produces or sells,
                    for example 'clothing retailing' not 'retailing'.
                </p>
                <p>
                    <strong>OR</strong>
                </p>

                <p>
                    Describe what you do, for example
                    'dairy farming' not 'dairy farmer'.
                </p>
            </div>
        </div>
    );
};

const searchCU = (props) => {
    props.searchCU(props.SearchCUValue, props.BICHost);
    props.panelContent('LevySearchResults');
};

const enterSearchCU = (e,props) => {
    if( e.key == 'Enter' ) {
        searchCU(props);
    }
};

const setSearchCUValue = (elm, props) => {
    props.setCurrentSearchCUValue(elm.target.value);
};

export default LevySearch;
