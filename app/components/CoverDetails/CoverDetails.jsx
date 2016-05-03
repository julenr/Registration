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
import './coverdetails.scss';

const CoverDetails = (props) => {
    return (
        <div className="cover-content">
            <h2>Business cover Details</h2>
            <p>
                <a href="javascript:void 0" onClick={() => setPanelContent(props, 'ACCCover')}>ACC business cover</a>&nbsp;
                is one of your most important business assets. We provide you with 24/7,
                no-fault personal injury cover, and you can only purchase it from ACC.
            </p>
            <div className="form-field">
                <label for="tax-year">TAX YEAR</label>
                <input type="text" name="tax-year" disabled defaultValue={props.TaxYear}/>
                <div>
                    Check your details to ensure you are paying the right levy for your situation
                </div>
            </div>
            <div className="form-field">
                <label for="employement-status">EMPLOYEMENT STATUS</label>
                <select name="employement-status">
                    {props.EmployementStatus.map((statusType, idx) => {
                        return (
                            <option key={idx}>
                                {statusType}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="form-field">
                <label for="acc-levy">ACC LEVY CALSSIFICATION (CU)</label>
                <input type="text" name="acc-levy" value={props.LevyClassification} />
            </div>
            <p>
                This is based on the <a href="javascript:void 0" onClick={() => setPanelContent(props, 'ACCCover')}>BIC code</a>&nbsp; you provided to IRD and determines the rate you will pay in levies.
            </p>
            <div className="form-field center">
                <button className="acc-button" onClick={() => props.checkLogin()}>Confirm/update my details</button>
            </div>
        </div>
    );
};

const setPanelContent = (props, content) => {
    props.panelContent(content);
    props.switchPanel();
};

export default CoverDetails;
