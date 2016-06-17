import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import Sorry from '../Sorry';

describe('<Sorry />', function() {

  it('should show the error message', function () {
    const wrapper = mount(<Sorry SorryError={'my error'} />);
    assert.equal(wrapper.find('#message-content').text(), 'my error');
  });

  it('should show the contact phone number', function () {
    const wrapper = mount(<Sorry />);
    assert.equal(wrapper.find('#acc-phone-number').text(), '0508 426 837');
  });

  it('should show the contact email address', function () {
    const wrapper = mount(<Sorry />);
    assert.equal(wrapper.find('#acc-email').text(), 'business@acc.co.nz');
  });

});
