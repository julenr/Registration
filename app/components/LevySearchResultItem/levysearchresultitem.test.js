import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import LevySearchResultItem from '../LevySearchResultItem';
import * as actions from '../../redux/actions/app.actions';

describe('<LevySearchResultItem />', function() {

  var searchData = require('../../redux/actions/fake-data').fakeData.searchResults;

  var item = {
    bicrefs: [{
      desc: "test code: #$0",
      refs: [{
        id: 1234,
        desc: "other code",
        type: "bic"
      },
      {
        id: 2345,
        type: "division"
      }]
    }],
    code: 'myBic',
    cu: {
      code: 'myCode',
      desc: 'myDesc'
    },
    definitionPlainText: 'myDef',
    desc: 'myTitle'
  };

  it('should show a collapsed item', function () {
    const wrapper = mount(<LevySearchResultItem {...item} idx={2} />);
    expect(wrapper.find('.title').text()).to.equal('myTitle');
    expect(wrapper.find('.bic').text()).to.equal('myBic');
    expect(wrapper.find('.definition').text()).to.equal('myDef');
    // test that 'other code' rendered correctly
    expect(wrapper.find('.altCode-0').text()).to.equal('test code: other code');
    expect(wrapper.find('.altCode-0').find('a').text()).to.equal('other code');
    // TODO add a second alt code
    expect(wrapper.find('.cu-code').text()).to.equal('myCode');
    expect(wrapper.find('.cu-description').text()).to.equal('myDesc');
    //card closed by default
    expect(wrapper.find('#resultItem-2').hasClass('not-expanded')).to.be.true;
    expect(wrapper.find('#item2').hasClass('octicon-chevron-down')).to.be.true;
    expect(wrapper.find('#item2').hasClass('octicon-chevron-up')).to.be.false;
  });
  
  it('should show an expanded item', function () {
    const wrapper = mount(<LevySearchResultItem {...item} idx={2} expanded={true} />);
    expect(wrapper.find('.title').text()).to.equal('myTitle');
    expect(wrapper.find('.bic').text()).to.equal('myBic');
    expect(wrapper.find('.definition').text()).to.equal('myDef');
    expect(wrapper.find('.cu-code').text()).to.equal('myCode');
    expect(wrapper.find('.cu-description').text()).to.equal('myDesc');
    //Select button is shown
    expect(wrapper.find('.searchCUSelectButton').hasClass('hide')).to.be.false;
    //Check that "expanded" card has correct properties
    expect(wrapper.find('#resultItem-2').hasClass('not-expanded')).to.be.false;
    expect(wrapper.find('#item2').hasClass('octicon-chevron-down')).to.be.false;
    expect(wrapper.find('#item2').hasClass('octicon-chevron-up')).to.be.true;
  });
  
  // test props.important renders as expected
  it('should not show the "important" text with an icon if no important text ', function () {
    const wrapper = mount(<LevySearchResultItem {...item} idx={2} />);
    expect(wrapper.find('.important-p').find('.octicon')).to.have.length(0);
    expect(wrapper.find('.important-p').find('.important')).to.have.length(0);
    // button not hidden
    expect(wrapper.find('.searchCUSelectButton').hasClass('hide')).to.be.false;
  });

  it('should show the "important" text with an icon if important text', function () {
    const wrapper = mount(<LevySearchResultItem {...item} idx={2} important={'IMPORTANT TEST'} />);
    expect(wrapper.find('.important-p').find('.octicon')).to.exist;
    expect(wrapper.find('.important-p').find('.octicon')).to.have.length(1);
    expect(wrapper.find('.important-p').find('strong')).to.exist;
    expect(wrapper.find('.important-p').find('strong').text().trim()).to.equal('IMPORTANT TEST');
    //and hides button
    expect(wrapper.find('.searchCUSelectButton').hasClass('hide')).to.be.true;
  });

  // test props.toggleResultItem using down arrow
  it('should expand the result card when clicking on the arrow', function () {
    const toggle = sinon.spy();
    const wrapper = mount(<LevySearchResultItem {...item} idx={2} toggleResultItem={toggle}/>);
    expect(wrapper.find('#resultItem-2').hasClass('not-expanded')).to.be.true;
    expect(wrapper.find('#item2').hasClass('octicon-chevron-down')).to.be.true;
    expect(wrapper.find('#item2').hasClass('octicon-chevron-up')).to.be.false;
    wrapper.find('#item2').simulate('click');
    assert(toggle.called);
  });

  // test props.toggleResultItem using Show result list link
  it('should toggle result frame when "show result list" is clicked', function () {
    const toggle = sinon.spy();
    const wrapper = mount(<LevySearchResultItem {...item} idx={2} toggleResultItem={toggle}/>);
    wrapper.find('.showResultList').at(0).simulate('click');
    assert(toggle.called);
    
  });
  // test searchFromLink in "other Codes"
  it('should search for a CU when clicking on an alternative code', function () {
    const searchCUByIDSpy = sinon.spy();
    const panelSpy = sinon.spy();
    const wrapper = mount(<LevySearchResultItem {...item} idx={2} BICHost={'myBicHost'} searchCUByID={searchCUByIDSpy} panelContent={panelSpy}/>);
    wrapper.find('.altCode-0').find('.link').simulate('click');
    assert(searchCUByIDSpy.called);
    assert(panelSpy.called);
    expect(searchCUByIDSpy.lastCall.args).to.deep.equal([1234,'myBicHost']);
    expect(panelSpy.lastCall.args).to.deep.equal(['LevySearchResults']);
  });

  // simulate clicking select button
  it('should change the CU when clicking on the select button', function () {
    const replace = sinon.spy();
    const switchSpy = sinon.spy();
    const wrapper = mount(<LevySearchResultItem {...item} idx={2} replaceCurrentCU={replace} switchPanel={switchSpy}/>);
    wrapper.find('#select-2').simulate('click');
    assert(replace.called);
    expect(replace.lastCall.args).to.deep.equal(['myCode']);
  });


  // hide button if important message
  it('should hide the select button if an "Important" message is present (to be changed)', function() {
    const wrapper = mount(<LevySearchResultItem {...item} idx={2} important={'IMPORTANT'}/>);
    expect(wrapper.find('.searchCUSelectButton').hasClass('hide')).to.be.true;
  });

});

