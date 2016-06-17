/**
 * Created by hodderk on 15/06/2016.
 */
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';

import Footer from '../Footer';

describe('<Footer />', function () {

    var stub;

    beforeEach(function () {
        stub = sinon.spy();
    });

    it('should show the links', function () {
        const wrapper = mount(<Footer/>);
        expect(wrapper.find('a')).to.have.length(6);
        expect(wrapper.find('a').at(0).text()).to.equal('Terms of use');
        expect(wrapper.find('a').at(1).text()).to.equal('Privacy Notice');
        expect(wrapper.find('a').at(2).text()).to.contain('Disclaimer and Copyright');
        expect(wrapper.find('a').at(3).text()).to.equal('Feedback');
        expect(wrapper.find('a').at(4).text()).to.equal('Contact Us');
    });

    it('should open all links in new tab/window', function () {
        const wrapper = mount(<Footer/>);
        expect(wrapper.find('a').at(0).prop('target')).to.equal('_blank');
        expect(wrapper.find('a').at(1).prop('target')).to.equal('_blank');
        expect(wrapper.find('a').at(2).prop('target')).to.equal('_blank');
        expect(wrapper.find('a').at(3).prop('target')).to.equal('_blank');
        expect(wrapper.find('a').at(4).prop('target')).to.equal('_blank');
        expect(wrapper.find('a').at(5).prop('target')).to.equal('_blank');
    });

});