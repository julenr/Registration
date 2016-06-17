import React from 'react';

// SASS Stylesheets
import './sorry.scss';

const Sorry = (props) => {
  return (
    <div className="sorry-content">
      <h2 id="message-header">Sorry</h2>
      <p id="message-content">
        {props.SorryError}
      </p>
      <p>
        Your invoice will be based on the information we currently have for you.
      </p>
      <p>
        Please check your invoice when it arrives, and if you have any questions, contact us.
      </p>
      <p>
        Phone: <a href="javascript:void 0" id="acc-phone-number">0508 426 837</a>
      </p>
      <p>
        Email: <a href="javascript:void 0" id="acc-email">business@acc.co.nz</a>
      </p>
    </div>
  );
};

export default Sorry;