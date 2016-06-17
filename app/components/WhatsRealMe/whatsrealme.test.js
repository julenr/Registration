import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';

import WhatsRealMe from '../WhatsRealMe';

describe('<WhatsRealMe />', function () {

    it('should allow the user to close the panel', function () {
        const switchPanel = sinon.spy();
        const wrapper = mount(<WhatsRealMe switchPanel={switchPanel}/>);
        wrapper.find('#whatsRealMePanel').find('a').simulate('click');
        assert(switchPanel.called);
    });

    it('should have external links to RealMe', function () {
        const wrapper = mount(<WhatsRealMe/>);
        let links = wrapper.find('.whatrealme-body').find('a');
        expect(links.at(0).prop('href')).to.equal('http://www.realme.govt.nz');
        expect(links.at(0).prop('target')).to.equal('_blank');
        expect(links.at(1).prop('href')).to.equal('http://www.realme.govt.nz');
        expect(links.at(1).prop('target')).to.equal('_blank');
    });
});