import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import LevySearchResults from '../LevySearchResults';
import * as actions from '../../redux/actions/app.actions';

describe('<LevySearchResults />', function() {

  var searchData = require('../../redux/actions/fake-data').fakeData.searchResults;

  it('should allow the user to search again (using the left arrow)', function () {
    const panelContent = sinon.spy();
    const wrapper = mount(<LevySearchResults SearchResults={[]} panelContent={panelContent} />);
    wrapper.find('#searchCUResultSubHeader').find('a').simulate('click');
    expect(panelContent.lastCall.args).to.deep.equal(['LevySearch']);
  });

  it('should allow the user to search again (using the link)', function () {
    const panelContent = sinon.spy();
    const wrapper = mount(<LevySearchResults SearchResults={[]} panelContent={panelContent} />);
    wrapper.find('#searchCUResultInfoHeader').find('a').simulate('click');
    expect(panelContent.lastCall.args).to.deep.equal(['LevySearch']);
  });

  it('should show the search text', function () {
    const wrapper = mount(<LevySearchResults SearchCUValue={'mySearch'} SearchResults={[]} />);
    expect(wrapper.find('#searchCUResultInfoHeader').find('strong').first().text()).to.equal('\'mySearch\'');
  });

  it('should show the number of results', function () {
    const wrapper = mount(<LevySearchResults SearchResults={[{bicrefs: [], cu: {}}, {bicrefs: [], cu: {}}]} />);
    expect(wrapper.find('#resultCount').text()).to.equal('2');
  });

  it('should show the results', function () {
    const item1 = {
        bicrefs: [],
        cu: {},
        test: 'a'
    };
    const item2 = {
        bicrefs: [],
        cu: {},
        test: 'b'
    };
    const toggleResultItem = {};
    const panelContent = {};
    const replaceCurrentCU = {};
    const switchPanel = {};
    const searchCUByID = {};
    const BICHost = {};
    const wrapper = mount(<LevySearchResults SearchResults={[item1, item2]}
        toggleResultItem={toggleResultItem}
        panelContent={panelContent}
        replaceCurrentCU={replaceCurrentCU}
        switchPanel={switchPanel}
        searchCUByID={searchCUByID}
        BICHost={BICHost}
    />);
    const results = wrapper.find('LevySearchResultItem');
    expect(results).to.have.length(2);
    expect(results.at(0).prop('test')).to.equal('a');
    expect(results.at(0).prop('idx')).to.equal(0);
    expect(results.at(0).prop('toggleResultItem')).to.equal(toggleResultItem);
    expect(results.at(0).prop('panelContent')).to.equal(panelContent);
    expect(results.at(0).prop('replaceCurrentCU')).to.equal(replaceCurrentCU);
    expect(results.at(0).prop('switchPanel')).to.equal(switchPanel);
    expect(results.at(0).prop('searchCUByID')).to.equal(searchCUByID);
    expect(results.at(0).prop('BICHost')).to.equal(BICHost);
    expect(results.at(1).prop('test')).to.equal('b');
    expect(results.at(1).prop('idx')).to.equal(1);
    expect(results.at(1).prop('toggleResultItem')).to.equal(toggleResultItem);
    expect(results.at(1).prop('panelContent')).to.equal(panelContent);
    expect(results.at(1).prop('replaceCurrentCU')).to.equal(replaceCurrentCU);
    expect(results.at(1).prop('switchPanel')).to.equal(switchPanel);
    expect(results.at(1).prop('searchCUByID')).to.equal(searchCUByID);
    expect(results.at(1).prop('BICHost')).to.equal(BICHost);
  });
  
});

