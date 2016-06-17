import React from 'react';

// SASS Stylesheets
import './thanks.scss';

const Thanks = (props) => {
  return (
    <div className="thanks-content">
      <h2 id="message-header">Thanks</h2>
      <p id="message-content">
        We have received your information.
      </p>
      <h4>What happens next?</h4>
      <p>
        You'll get your ACC invoice in the mail, showing how your levy is calculated and your payment options.
      </p>
      <h4>Got a question?</h4>
      <p>
        Phone: <a href="javascript:void 0" id="acc-phone-number">0508 426 837</a>
      </p>
      <p>
        Email: <a href="javascript:void 0" id="acc-email">business@acc.co.nz</a>
      </p>
    </div>
  );
};

export default Thanks;