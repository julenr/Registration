import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import Login from '../Login';

const capture = sinon.spy();

describe('<Login />', function() {

  // var stub;

  beforeEach(function() {
    // stub = sinon.spy();
    capture.reset();
  });

  it('should show an error message', function () {
    const wrapper = mount(<Login RegistrationError={'my error'} />);
    assert.equal(wrapper.find('#loginErrorBox').text(), 'my error');
  });
  
  it('should allow the user to enter a Registration Code', function () {
    const wrapper = mount(<Login setRegCodeValue={capture} />);
    wrapper.find('#registration-code').simulate('change', {target: {value: 'abc123'}});
    expect(capture.lastCall.args).to.deep.equal(['abc123']);
  });
  
  it('should allow the user to enter an IRD Number', function () {
    const wrapper = mount(<Login setIrdNumberValue={capture} />);
    wrapper.find('#ird-number').simulate('change', {target: {value: '123-456-789'}});
    expect(capture.lastCall.args).to.deep.equal(['123-456-789']);
  });
  
  it('should allow the user to enter an Email Address', function () {
    const wrapper = mount(<Login setEmailValue={capture} />);
    wrapper.find('#email').simulate('change', {target: {value: 'a@b.c'}});
    expect(capture.lastCall.args).to.deep.equal(['a@b.c']);
  });

  it('should register the user if they click the button', function () {
    const register = {};
    const wrapper = mount(<Login Register={register} register={capture} />);
    wrapper.find('#login').simulate('click');
    expect(capture.lastCall.args[0]).to.equal(register);
  });
        
  it('should register the user if they press Enter while typing a Registration Code', function () {
    const register = {};
    const wrapper = mount(<Login Register={register} register={capture} />);
    wrapper.find('#registration-code').simulate('keypress', {key: 'Enter'});
    expect(capture.lastCall.args[0]).to.equal(register);
  });

  it('should register the user if they press Enter while typing an IRD Number', function () {
    const register = {};
    const wrapper = mount(<Login Register={register} register={capture} />);
    wrapper.find('#ird-number').simulate('keypress', {key: 'Enter'});
    expect(capture.lastCall.args[0]).to.equal(register);
  });

  it('should register the user if they press Enter while typing an Email Address', function () {
    const register = {};
    const wrapper = mount(<Login Register={register} register={capture} />);
    wrapper.find('#email').simulate('keypress', {key: 'Enter'});
    expect(capture.lastCall.args[0]).to.equal(register);
  });

  it('should open the RealMe info panel when clicking link', function () {
    var switchPanelStub = sinon.stub();
    const wrapper = mount(<Login panelContent={capture} switchPanel={switchPanelStub}/>);
    wrapper.find('#whatsRealMeLink').simulate('click');
    sinon.assert.calledOnce(capture);
    sinon.assert.calledWith(capture, 'WhatsRealMe');
    sinon.assert.calledOnce(switchPanelStub);
  });

  it('should open the Terms of Use link to the right location in a new window', function () {
    const wrapper = mount(<Login/>);
    let links = wrapper.find('#termsAndConditions').find('a');
    expect(links.at(0).prop('href')).to.equal('http://www.acc.co.nz/terms-of-use/index.htm');
    expect(links.at(0).prop('target')).to.equal('_blank');
    expect(links.at(1).prop('href')).to.equal('http://www.acc.co.nz/terms-of-use/index.htm');
    expect(links.at(1).prop('target')).to.equal('_blank');
  });

});