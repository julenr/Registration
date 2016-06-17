import React from 'react';

const Classification = (props) => {
    return (
        <div className="classification-content">
            <div className="form-field input-plus-button-wrapper">
                <label for="acc-levy-classification">ACC LEVY CLASSIFICATION (CU) *</label>
                <a className="black-text selectable" onClick={() => setPanelContent(props, 'LevySearch')}>
                    <div className="input-plus-button-box" id="acc-levy-classification" name="acc-levy-classification">
                        {props.LevyClassificationCode} - {props.LevyClassificationDescription}
                    </div>
                    <span className="input-plus-button-icon octicon octicon-chevron-right"></span>
                </a>
            </div>
            {(() => {
              if (props.CUChanged) {
                return (
                    <div>
                        <p id="cu-after-blurb">
                            You've chosen a new code.  To help us check it's the right one, please describe what you do in your own words. 
                        </p>
                        <div className="form-field">
                            <label for="business-activity-description">YOUR ACTIVITY DESCRIPTION *</label>
                            <textarea id="business-activity-description" name="business-activity-description" onChange={(elm) => setBusinessActivityDescription(elm, props)} placeholder="Briefly describe what you do" rows="3"/>
                        </div>
                    </div>
                );
              } else {
                return (
                    <p id="cu-before-blurb">
                        This is based on the&nbsp;
                        <a id="bic-code" href="javascript:void 0" onClick={() => setPanelContent(props, 'ACCCover')}>BIC code</a>
                        &nbsp;provided by IRD.
                    </p>
                );
              }
            })()}
        </div>
    );
};

const setPanelContent = (props, content) => {
    props.panelContent(content);
    props.switchPanel();
};

const setBusinessActivityDescription = (elm, props) => {
  props.setBusinessActivityDescription(elm.target.value);
};

export default Classification;
