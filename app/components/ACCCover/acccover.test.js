import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';

import ACCCover from '../ACCCover';

describe('<ACCCover />', function () {

    it('should allow the user to close the panel', function () {
        const switchPanel = sinon.spy();
        const wrapper = mount(<ACCCover switchPanel={switchPanel}/>);
        wrapper.find('#BICPanel').find('a').simulate('click');
        assert(switchPanel.called);
    });

    it('should have external links to Business Decription site', function () {
        const wrapper = mount(<ACCCover/>);
        let links = wrapper.find('.acc-cover').find('a');
        expect(links.at(0).prop('href')).to.equal('https://www.businessdescription.co.nz/help/');
        expect(links.at(0).prop('target')).to.equal('_blank');
        expect(links.at(1).prop('href')).to.equal('https://www.businessdescription.co.nz/help/');
        expect(links.at(1).prop('target')).to.equal('_blank');
    });
});