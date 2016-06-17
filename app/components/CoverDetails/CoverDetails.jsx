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

import Classification from '../Classification';

const CoverDetails = (props) => {
    return (
        <div className="cover-content">
            <h2 id="account-name">{props.AccountName}</h2>
            <h4 id="acc-number">ACC Number: {props.ACCNumber}</h4>
            <p>
                Check your details to ensure you pay the right levy for your situation.
            </p>
            <div className="form-field">
                <label for="tax-year">TAX YEAR</label>
                <input type="text" id="tax-year" name="tax-year" disabled defaultValue={props.TaxYear}/>
            </div>
            <div className="form-field">
                <label for="employment-status">EMPLOYMENT STATUS *</label>
                <select id="employment-status" name="employment-status" className="selectable"
                        defaultValue={props.EmploymentStatus}
                        onChange={(elm) => setEmploymentStatus(elm, props) }>
                    <option value='F'>
                        Full time (more than 30 hours/week)
                    </option>
                    <option value='U'>
                        Part time (less than 30 hours/week)
                    </option>
                </select>
            </div>
            <Classification {...props} />
            <div className="form-field center">
                <button id="confirm" className="acc-button" 
                        onClick={() => props.confirmCoverDetails(props.Customer)}>Confirm your details</button>
            </div>
        </div>
    );
};

const setEmploymentStatus = (elm, props) => {
  props.setEmploymentStatus(elm.target.value);
};

export default CoverDetails;
