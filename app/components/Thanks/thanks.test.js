import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import Thanks from '../Thanks';

describe('<Thanks />', function() {

  it('should show the message', function () {
    const wrapper = mount(<Thanks Error={'my error'} />);
    assert.equal(wrapper.find('#message-content').text(), 'We have received your information.');
  });

  it('should show the contact phone number', function () {
    const wrapper = mount(<Thanks />);
    assert.equal(wrapper.find('#acc-phone-number').text(), '0508 426 837');
  });

  it('should show the contact email address', function () {
    const wrapper = mount(<Thanks />);
    assert.equal(wrapper.find('#acc-email').text(), 'business@acc.co.nz');
  });

});
