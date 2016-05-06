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
            <div className="sub-header">
                <a href="#" className="chevron fa fa-chevron-left" onClick={props.switchPanel}/>
                ACC Levy Classification (CU)
            </div>
            <div className="levy-content">
                <p>
                    Your ACC Levy Classification (CU) is defined by your Business industry description
                    (BIC) and determines the rate you will pay in levies. The rates vary depending on your
                    industry and are higher for higher risk businesses.
                </p>
                <p>
                    Your current CU is:<br />
                    <strong>{`${props.LevyClassification.code} - ${props.LevyClassification.title}`}</strong>
                </p>
                <p>
                    You can browse the activity description for Real estate services
                </p>
                <p>
                    or you can
                </p>
                <div className="form-field input-plus-button-wrapper">
                    <label for="acc-levy">SEARCH FOR YOUR CODE</label>
                    <input className="input-plus-button-box" type="text"
                        onChange={(elm) => setSearchCUValue(elm, props) }
                        name="acc-levy" placeholder="Enter keyword or code"
                        defaultValue={props.SearchCUValue}
                    />
                    <a href="javascript:void 0" id="cu-search" className="input-plus-button-icon fa fa-search"
                        onClick={() => searchCU(props)}>
                    </a>
                </div>
                <p>
                    Describe the goods or services the business produces or sells,
                    for example 'clothing retailing' not 'retailing'.
                </p>
                <p>
                    If you are self-employed, describe what you do, for example
                    'dairy farming' not 'dairy farmer'.
                </p>
                <a href="javascript void 0">Need more help</a><br />
            </div>
        </div>
    );
};

const searchCU = (props) => {
    props.searchCU();
    props.panelContent('LevySearchResult');
};

const setSearchCUValue = (elm, props) => {
    props.setCurrentSearchCUValue(elm.target.value);
};

export default LevySearch;
