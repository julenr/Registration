import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';

import Window from '../../util/Window';

import ConnectedApp, { App } from './App';
import Header from '../Header';
import Login from '../Login';
import CoverDetails from '../CoverDetails';
import Thanks from '../Thanks';
import Sorry from '../Sorry';
import Footer from '../Footer';
import Panel from '../Panel';
import ACCCover from '../ACCCover';
import TermsOfUse from '../TermsOfUse';
import LevySearch from '../LevySearch';
import LevySearchResults from '../LevySearchResults';
import WhatsRealMe from '../WhatsRealMe';

const middlewares = [ promiseMiddleware ];
const mockStore = configureStore(middlewares);

const pageHeaderSpy = sinon.spy();
const logoutSpy = sinon.spy();
const fetchPartiesSpy = sinon.spy();

describe('<App />', function() {
  
  beforeEach(function(){
    pageHeaderSpy.reset();
    logoutSpy.reset();
    fetchPartiesSpy.reset();
  });
  
  it('should map the state to properties', function () {
    const state = {
      _app: {
        refresh: 'myRefresh',
        pageHeader: 'myPageHeader',
        panelActive: 'myPanelActive',
        panelContent: 'myPanelContent',
        register: 'myRegister',
        loggedIn: 'myLoggedIn',
        fetchingParties: 'myFetchingParties',
        fetchingAccount: 'myFetchingAccount',
        confirmingCoverDetails: 'myConfirmingCoverDetails',
        confirmCoverDetailsSuccess: 'myConfirmCoverDetailsSuccess',
        accountNumber: 'myAccountNumber',
        accNumber: 'myAccNumber',
        accountName: 'myAccountName',
        taxYear: 'myTaxYear',
        employmentStatus: 'myEmploymentStatus',
        levyClassification: {
          code: 'myLevyClassificationCode',
          description: 'myLevyClassificationDescription'
        },
        levySearch: {
          searching: 'mySearching',
          searchCUValue: 'mySearchCUValue',
          searchResults: 'mySearchResults'
        },
        bicHost: 'myBicHost',
        customer: {
          accountList: [{
            accSuffix: 'S',
            accountName: 'my name',
            fmuCode: 'F',
            classificationsList: [{
              levyYear: '1 April 2015 - 31 March 2016',
              classificationUnitCode: 'my code',
              classificationUnitDescription: 'my description'
            }]
          }]
        },
        registrationError: 'myRegistrationError',
        sorryError: 'mySorryError'
      }
    };
    const wrapper = shallow(<ConnectedApp store={mockStore(state)}/>);
    expect(wrapper.prop('Refresh')).to.equal('myRefresh');
    expect(wrapper.prop('PageHeader')).to.equal('myPageHeader');
    expect(wrapper.prop('PanelActive')).to.equal('myPanelActive');
    expect(wrapper.prop('PanelContent')).to.equal('myPanelContent');
    expect(wrapper.prop('Register')).to.equal('myRegister');
    expect(wrapper.prop('LoggedIn')).to.equal('myLoggedIn');
    expect(wrapper.prop('FetchingParties')).to.equal('myFetchingParties');
    expect(wrapper.prop('FetchingAccount')).to.equal('myFetchingAccount');
    expect(wrapper.prop('ConfirmingCoverDetails')).to.equal('myConfirmingCoverDetails');
    expect(wrapper.prop('ConfirmCoverDetailsSuccess')).to.equal('myConfirmCoverDetailsSuccess');
    expect(wrapper.prop('ACCNumber')).to.equal('myAccNumber');
    expect(wrapper.prop('AccountName')).to.equal('myAccountName');
    expect(wrapper.prop('TaxYear')).to.equal('myTaxYear');
    expect(wrapper.prop('EmploymentStatus')).to.equal('myEmploymentStatus');
    expect(wrapper.prop('LevyClassificationCode')).to.equal('myLevyClassificationCode');
    expect(wrapper.prop('LevyClassificationDescription')).to.equal('myLevyClassificationDescription');
    expect(wrapper.prop('SearchCUValue')).to.equal('mySearchCUValue');
    expect(wrapper.prop('SearchResults')).to.equal('mySearchResults');
    expect(wrapper.prop('Searching')).to.equal('mySearching');
    expect(wrapper.prop('BICHost')).to.equal('myBicHost');
    expect(wrapper.prop('Customer')).to.equal(state._app.customer);
    expect(wrapper.prop('RegistrationError')).to.equal(state._app.registrationError);
    expect(wrapper.prop('SorryError')).to.equal(state._app.sorryError);
  });
  
  it('should contain a <Header /> component', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={false} />);
    expect(wrapper.find(Header)).to.have.length(1);
  });
  
  it('should contain a <Login /> component if the user isn\'t logged in', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={false} />);
    expect(wrapper.find(Login)).to.have.length(1);
    expect(wrapper.find(CoverDetails)).to.have.length(0);
    expect(wrapper.find(Thanks)).to.have.length(0);
    expect(wrapper.find(Sorry)).to.have.length(0);
  });
  
  it('should contain a <CoverDetails /> component if the user is logged in', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={true} />);
    expect(wrapper.find(Login)).to.have.length(0);
    expect(wrapper.find(CoverDetails)).to.have.length(1);
    expect(wrapper.find(Thanks)).to.have.length(0);
    expect(wrapper.find(Sorry)).to.have.length(0);
  });
  
  it('should contain neither a <Login /> nor a <CoverDetails /> component if the user is logged in but the parties haven\'t yet been fetched', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={true} FetchingParties={true} />);
    expect(wrapper.find(Login)).to.have.length(0);
    expect(wrapper.find(CoverDetails)).to.have.length(0);
    expect(wrapper.find(Thanks)).to.have.length(0);
    expect(wrapper.find(Sorry)).to.have.length(0);
  });
  
  it('should contain none of <Login /> , <CoverDetails /> or <Thanks /> components if the user is logged in but the account data hasn\'t yet been fetched', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={true} FetchingAccount={true} />);
    expect(wrapper.find(Login)).to.have.length(0);
    expect(wrapper.find(CoverDetails)).to.have.length(0);
    expect(wrapper.find(Thanks)).to.have.length(0);
    expect(wrapper.find(Sorry)).to.have.length(0);
  });

  it('should contain only a <Thanks /> component if the user has fetched account data and confirmed cover details', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={false} FetchingAccount={false} ConfirmCoverDetailsSuccess={true} />);
    expect(wrapper.find(Login)).to.have.length(0);
    expect(wrapper.find(CoverDetails)).to.have.length(0);
    expect(wrapper.find(Thanks)).to.have.length(1);
    expect(wrapper.find(Sorry)).to.have.length(0);
  });
  
  it('should contain only a <Sorry /> component if a fatal error has occurred', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={false} SorryError={'my error'} />);
    expect(wrapper.find(Login)).to.have.length(0);
    expect(wrapper.find(CoverDetails)).to.have.length(0);
    expect(wrapper.find(Thanks)).to.have.length(0);
    expect(wrapper.find(Sorry)).to.have.length(1);
  });
  
  it('should contain a <Panel /> component', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={false} />);
    expect(wrapper.find(Panel)).to.have.length(1);
  });
  
  it('should contain a <ACCCover /> component if that panel is selected', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={false} PanelContent={'ACCCover'} />);
    expect(wrapper.find(ACCCover)).to.have.length(1);
    expect(wrapper.find(TermsOfUse)).to.have.length(0);
    expect(wrapper.find(LevySearch)).to.have.length(0);
    expect(wrapper.find(LevySearchResults)).to.have.length(0);
    expect(wrapper.find(WhatsRealMe)).to.have.length(0);
  });

  // *** This panel has been removed (replaced with external link) but may come back ***
  it('should contain a <WhatsRealMe /> component if that panel is selected', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={false} PanelContent={'WhatsRealMe'}/>);
    expect(wrapper.find(ACCCover)).to.have.length(0);
    expect(wrapper.find(WhatsRealMe)).to.have.length(1);
    expect(wrapper.find(LevySearch)).to.have.length(0);
    expect(wrapper.find(LevySearchResults)).to.have.length(0);
    expect(wrapper.find(TermsOfUse)).to.have.length(0);
  });
  
  it('should contain a <LevySearch /> component if that panel is selected', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={false} PanelContent={'LevySearch'} />);
    expect(wrapper.find(ACCCover)).to.have.length(0);
    expect(wrapper.find(TermsOfUse)).to.have.length(0);
    expect(wrapper.find(LevySearch)).to.have.length(1);
    expect(wrapper.find(LevySearchResults)).to.have.length(0);
    expect(wrapper.find(WhatsRealMe)).to.have.length(0);
  });
  
  it('should contain a <LevySearchResults /> component if that panel is selected', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={false} PanelContent={'LevySearchResults'} SearchResults={[]} />);
    expect(wrapper.find(ACCCover)).to.have.length(0);
    expect(wrapper.find(TermsOfUse)).to.have.length(0);
    expect(wrapper.find(LevySearch)).to.have.length(0);
    expect(wrapper.find(LevySearchResults)).to.have.length(1);
    expect(wrapper.find(WhatsRealMe)).to.have.length(0);
  });
  
  it('should contain a <Footer /> component', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} LoggedIn={false} />);
    expect(wrapper.find(Footer)).to.have.length(1);
  });
  
  it('should display the correct document title and page header as the state changes', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} logout={logoutSpy} />);
    expect(document.title).to.equal('');
    wrapper.setProps({LoggedIn: true});
    expect(document.title).to.equal('MyACC - Your cover details');
    expect(pageHeaderSpy.lastCall.args).to.deep.equal(['Your cover details']);
    wrapper.setProps({LoggedIn: false, ConfirmCoverDetailsSuccess: true});
    expect(document.title).to.equal('MyACC - Your cover details');
    expect(pageHeaderSpy.lastCall.args).to.deep.equal(['MyACC']);
    wrapper.setProps({LoggedIn: false, ConfirmCoverDetailsSuccess: false});
    expect(document.title).to.equal('MyACC - Welcome');
    expect(pageHeaderSpy.lastCall.args).to.deep.equal(['Welcome to MyACC']);
  });

  it('should force logout of any existing OpenAM session', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} logout={logoutSpy} />);
    assert(logoutSpy.called);
  });

  it('should log the user out after they have updated their details', function () {
    const wrapper = mount(<App pageHeader={pageHeaderSpy} logout={logoutSpy} />);
    logoutSpy.reset();
    assert(logoutSpy.notCalled);
    wrapper.setProps({LoggedIn: true, ConfirmCoverDetailsSuccess: true}); 
    assert(logoutSpy.called);
  });

  it('should fetch customer data when the user has just returned from RealMe', function () {
    sinon.stub(Window, 'location').returns({href: 'something#CoverDetails'});
    const wrapper = mount(<App pageHeader={pageHeaderSpy} logout={logoutSpy} fetchParties={fetchPartiesSpy} />);
    assert(fetchPartiesSpy.called);
    assert(logoutSpy.notCalled);
    Window.location.restore();
  });
    
  it('should not fetch customer data when the user hasn\'t just returned from RealMe', function () {
    sinon.stub(Window, 'location').returns({href: 'something#CoverDetails'});
    const wrapper = mount(<App pageHeader={pageHeaderSpy} logout={logoutSpy} fetchParties={fetchPartiesSpy} LoggedIn={true} />);
    assert(fetchPartiesSpy.notCalled);
    assert(logoutSpy.notCalled);
    Window.location.restore();
  });
    
});
