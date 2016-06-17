import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import CoverDetails from '../CoverDetails';

describe('<CoverDetails />', function() {

  var stub;
  
  beforeEach(function() {
    stub = sinon.spy();
  });

  it('should show the account name', function () {
    const wrapper = mount(<CoverDetails AccountName={'myAccountName'} />);
    assert.equal(wrapper.find('#account-name').text(), 'myAccountName');
  });

  it('should show the ACC number', function () {
    const wrapper = mount(<CoverDetails ACCNumber={'myAccNumber'} />);
    assert.equal(wrapper.find('#acc-number').text(), 'ACC Number: myAccNumber');
  });

  it('should show the tax year', function () {
    const wrapper = mount(<CoverDetails TaxYear={'myTaxYear'} />);
    assert.equal(wrapper.find('#tax-year').prop('defaultValue'), 'myTaxYear');
  });

  it('should show the employment status', function () {
    const wrapper = mount(<CoverDetails EmploymentStatus={'myEmploymentStatus'} />);
    assert.equal(wrapper.find('#employment-status').prop('defaultValue'), 'myEmploymentStatus');
  });

  it('should allow the user to change the Employment Status', function () {
    const wrapper = mount(<CoverDetails setEmploymentStatus={stub} />);
    wrapper.find('#employment-status').simulate('change', {target: {value: 'F'}});
    sinon.assert.calledOnce(stub);
    sinon.assert.calledWith(stub, 'F');
  });

  it('should allow the user to click the Confirm your details button', function () {
    const customer = {};
    const confirmStub = sinon.spy();
    const wrapper = mount(<CoverDetails confirmCoverDetails={stub} Customer={customer} />);
    wrapper.find('#confirm').simulate('click');
    sinon.assert.called(stub);
    sinon.assert.calledWith(stub, customer);
  });

});
