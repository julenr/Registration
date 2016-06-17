import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import Classification from '../Classification';

describe('<Classification />', function() {

  var stub;
  
  beforeEach(function() {
    stub = sinon.spy();
  });

  it('should show the levy classification', function () {
    const wrapper = mount(<Classification LevyClassificationCode={'myCode'} LevyClassificationDescription={'myDesc'} />);
    assert.equal(wrapper.find('#acc-levy-classification').text(), 'myCode - myDesc');
  });

  it('should show help text but no business activity description input if the CU code has not been changed', function () {
    const wrapper = mount(<Classification CUChanged={false} />);
    expect(wrapper.find('#cu-before-blurb')).to.have.length(1);
    expect(wrapper.find('#cu-after-blurb')).to.have.length(0);
    expect(wrapper.find('#business-activity-description')).to.have.length(0);
  });

  it('should show updated help text plus a business activity description input if the CU code has been changed', function () {
    const wrapper = mount(<Classification CUChanged={true} />);
    expect(wrapper.find('#cu-before-blurb')).to.have.length(0);
    expect(wrapper.find('#cu-after-blurb')).to.have.length(1);
    expect(wrapper.find('#business-activity-description')).to.have.length(1);
  });

  it('should allow the user to change the CU Code', function () {
    var switchPanelStub = sinon.stub();
    const wrapper = mount(<Classification panelContent={stub} switchPanel={switchPanelStub} />);
    wrapper.find('.black-text').simulate('click');
    sinon.assert.calledOnce(stub);
    sinon.assert.calledWith(stub, 'LevySearch');
    sinon.assert.calledOnce(switchPanelStub);
  });

  it('should allow the user to click BIC code link', function () {
    var switchPanelStub = sinon.stub();
    const wrapper = mount(<Classification panelContent={stub} switchPanel={switchPanelStub} />);
    wrapper.find('#bic-code').simulate('click');
    sinon.assert.calledOnce(stub);
    sinon.assert.calledWith(stub, 'ACCCover');
    sinon.assert.calledOnce(switchPanelStub);
  });

  it('should allow the user to change the business activity description', function () {
    const wrapper = mount(<Classification CUChanged={true} setBusinessActivityDescription={stub} />);
    wrapper.find('#business-activity-description').simulate('change', {target: {value: 'myBusinessActivityDescription'}});
    sinon.assert.calledOnce(stub);
    sinon.assert.calledWith(stub, 'myBusinessActivityDescription');
  });

});
