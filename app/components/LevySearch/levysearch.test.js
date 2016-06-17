import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import LevySearch from '../LevySearch';

describe('<LevySearch />', function() {

  it('should allow the user to close the panel', function () {
    const switchPanel = sinon.spy();
    const wrapper = mount(<LevySearch switchPanel={switchPanel} />);
    wrapper.find('#searchCUSubHeader').find('a').simulate('click');
    assert(switchPanel.called);
  });

  it('should show the current CU code and description', function () {
    const wrapper = mount(<LevySearch LevyClassificationCode={'myCode'} LevyClassificationDescription={'myDescription'} />);
    expect(wrapper.find('#searchCUBody').find('strong').first().text()).to.equal('myCode - myDescription');
  });

  it('should default to the previous search text', function () {
    const wrapper = mount(<LevySearch SearchCUValue={'mySearch'} />);
    expect(wrapper.find('#searchCUSearchBox').prop('defaultValue')).to.equal('mySearch');
  });

  it('should allow the user to enter search text', function () {
    const setCurrentSearchCUValue = sinon.spy();
    const wrapper = mount(<LevySearch setCurrentSearchCUValue={setCurrentSearchCUValue} />);
    wrapper.find('#searchCUSearchBox').simulate('change', {target: {value: 'mySearch'}});
    expect(setCurrentSearchCUValue.lastCall.args).to.deep.equal(['mySearch']);
  });
  
  it('should search if the user clicks the button', function () {
    const searchCU = sinon.spy();
    const panelContent = sinon.spy();
    const wrapper = mount(<LevySearch SearchCUValue={'mySearch'} BICHost={'myBicHost'} searchCU={searchCU} panelContent={panelContent} />);
    wrapper.find('#cu-search').simulate('click');
    expect(searchCU.lastCall.args).to.deep.equal(['mySearch', 'myBicHost']);
    expect(panelContent.lastCall.args).to.deep.equal(['LevySearchResults']);
  });

  it('should search if the user presses Enter', function () {
    const searchCU = sinon.spy();
    const panelContent = sinon.spy();
    const wrapper = mount(<LevySearch SearchCUValue={'mySearch'} BICHost={'myBicHost'} searchCU={searchCU} panelContent={panelContent} />);
    wrapper.find('#searchCUSearchBox').simulate('keypress', {key: 'Enter'});
    expect(searchCU.lastCall.args).to.deep.equal(['mySearch', 'myBicHost']);
    expect(panelContent.lastCall.args).to.deep.equal(['LevySearchResults']);
  });

});

