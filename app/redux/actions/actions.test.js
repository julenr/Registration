// ES6 Polyfill
import 'babel-polyfill';
import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as actions from './app.actions';
import * as types from './ActionTypes';
import Store from '../create-store';
import Window from '../../util/Window';

describe('actions', () => {
  
  var mock;
  
  beforeEach(function() {
    mock = new MockAdapter(axios);
  });
  
  it('should create an action to set the page header', () => {
    const content = 'test';
    const expectedAction = {
      type: types.PAGE_HEADER,
      content
    };
    expect(actions.pageHeader(content)).to.deep.equal(expectedAction);
  });
  
  it('should create an action to switch the right panel', () => {
    const expectedAction = {
      type: types.SWITCH_PANEL
    };
    expect(actions.switchPanel()).to.deep.equal(expectedAction);
  });
  
  it('should create an action to set the content in the panel', () => {
    const content = 'test';
    const expectedAction = {
      type: types.PANEL_CONTENT,
      content
    };
    expect(actions.panelContent(content)).to.deep.equal(expectedAction);
  });

  it('should create an action to clear the registration error', () => {
    const expectedAction = {
      type: types.CLEAR_REGISTRATION_ERROR
    };
    expect(actions.clearRegistrationError()).to.deep.equal(expectedAction);
  });
  
  describe('should create an action to log the user out that', () => {

    it('should handle success', () => {
      
      mock.onGet('/logout').reply(200, {});
      const action = actions.logout();
      expect(action.type).to.equal(types.LOGOUT);
      return action.payload.should.be.fulfilled;
    });

    it('should handle failure', () => {
      mock.onGet('/logout').reply(500);
      return actions.logout().payload.should.be.rejected;
    });
  });
  
  describe('should create an action to register the user that', () => {

    var redirect = sinon.stub(Window, 'redirect');
    
    var registerData = {
      regCodeValue: '74e355d',
      irdNumberValue: '555666777',
      emailValue: 'stu11@acc.co.nz'
    };
    
    beforeEach(function(){
      redirect.reset();
    });

    it('should handle success', () => {
      var responseData = {
          redirectUrl: 'dummy/url'
        };
      mock.onPut(/\/api-unauth\/users\/register\?cid=[0-9A-Za-z]{8}&regCode=74e355d&irdNumber=555666777&email=stu11%40acc.co.nz&gotoUrl=%2Fbusiness%2Fregister%2F%23CoverDetails/).reply(200, responseData);
      const action = actions.register(registerData);
      expect(action.type).to.equal(types.REGISTER);
      return action.payload.then(function(result){
        sinon.assert.called(redirect);
        sinon.assert.calledWith(redirect, responseData.redirectUrl);
        return result;
      }).should.eventually.have.property('data', responseData);
    });

    it('should handle success with an error code', () => {
      var responseData = {
          error: 'my error'
        };
      mock.onPut(/\/api-unauth\/users\/register\?cid=[0-9A-Za-z]{8}&regCode=74e355d&irdNumber=555666777&email=stu11%40acc.co.nz&gotoUrl=%2Fbusiness%2Fregister%2F%23CoverDetails/).reply(200, responseData);
      return actions.register(registerData).payload.should.be.rejectedWith('my error');
    });

    it('should handle success with no redirect url', () => {
      var responseData = {};
      mock.onPut(/\/api-unauth\/users\/register\?cid=[0-9A-Za-z]{8}&regCode=74e355d&irdNumber=555666777&email=stu11%40acc.co.nz&gotoUrl=%2Fbusiness%2Fregister%2F%23CoverDetails/).reply(200, responseData);
      return actions.register(registerData).payload.should.be.rejected;
    });

    it('should handle failure', () => {
      mock.onPut(/\/api-unauth\/users\/register\?cid=[0-9A-Za-z]{8}&regCode=74e355d&irdNumber=555666777&email=stu11%40acc.co.nz&gotoUrl=%2Fbusiness%2Fregister%2F%23CoverDetails/).reply(500);
      return actions.register(registerData).payload.should.be.rejected;
    });
  });
  
  describe('should create an action to fetch parties that', () => {
    
    it('should handle success', () => {
      var correlationId;
      mock.onGet(/\/api\/customeraccount\/parties\?cid=[0-9A-Za-z]{8}/).reply(function(config) {
        // save correlation id from the first request
        correlationId = config.url.substring(config.url.length - 8);
        return [200, [{
          accountNumber: 'A1234567'
        }], {
        'content-type': 'application/json'
        }];
      });
      mock.onGet(/\/api\/customeraccount\/parties\/A1234567\?cid=[0-9A-Za-z]{8}/).reply(function(config){
        // the second request should use the same correlation id as the first request
        expect(config.url.substring(config.url.length - 8)).to.equal(correlationId);
        return [200, {}];
      });
      var stub = sinon.stub(Store, 'dispatch');
      const action = actions.fetchParties();
      expect(action.type).to.equal(types.FETCH_PARTIES);
      return action.payload.then(function(result){
        // check that the action was dispatched
        assert(stub.calledOnce);
        expect(stub.lastCall.args[0]).to.have.property('type', types.FETCH_ACCOUNT);
        return result;
        // check that the account number was returned for the reducer to update the state
      }).should.eventually.have.property('data', 'A1234567');
    });
    
    it('should handle being redirected by OpenAM', () => {
      mock.onGet(/\/api\/customeraccount\/parties\?cid=[0-9A-Za-z]{8}/).reply(200, '', {
        'content-type': 'text/html'
      });
      return actions.fetchParties().payload.should.be.rejectedWith('unauthenticated');
    });
    
    it('should handle failure', () => {
      mock.onGet(/\/api\/customeraccount\/parties\?cid=[0-9A-Za-z]{8}/).reply(500);
      return actions.fetchParties().payload.should.be.rejected;
    });
    
  });
  
  describe('should create an action to fetch an account that', () => {
    
    it('should handle success', () => {
      var data = {};
      mock.onGet('/api/customeraccount/parties/A1234567?cid=12345678').reply(200, data);
      const action = actions.fetchAccount('12345678', 'A1234567');
      expect(action.type).to.equal(types.FETCH_ACCOUNT);
      return action.payload.should.eventually.have.property('data', data);
    });
    
    it('should handle failure', () => {
      mock.onGet('/api/customeraccount/parties/A1234567?cid=12345678').reply(500);
      return actions.fetchAccount('12345678', 'A1234567').payload.should.be.rejected;
    });
    
  });
  
  it('should create an action to set the current CU value', () => {
    const value = 'test';
    const expectedAction = {
      type: types.SET_SEARCH_CU_VALUE,
      value
    };
    expect(actions.setCurrentSearchCUValue(value)).to.deep.equal(expectedAction);
  });

  describe('should create an action to confirm user details that', () => {

    var customer = require('./fake-data').fakeData.customer;

    it('should handle success', () => {

      mock.onPut(/\/api\/customeraccount\/parties\/A1234567\?cid=[0-9A-Za-z]{8}/).reply(200, customer);
      const action = actions.confirmCoverDetails(customer);

      expect(action.type).to.equal(types.CONFIRM_DETAILS);

      return action.payload.should.eventually.have.property('data', customer);
    });

    it('should handle failure', () => {
      mock.onPut(/\/api\/customeraccount\/parties\/A1234567\?cid=[0-9A-Za-z]{8}/).reply(500);
      return actions.confirmCoverDetails(customer).payload.should.be.rejected;
    });
  });
  
  it('should create an action to toggle a search result item', () => {
    const itemCode = 'test';
    const expectedAction = {
      type: types.TOGGLE_RESULT_ITEM,
      itemCode
    };
    expect(actions.toggleResultItem(itemCode)).to.deep.equal(expectedAction);
  });
  
  it('should create an action to replace the current CU value', () => {
    const itemCode = 'test';
    const expectedAction = {
      type: types.REPLACE_CURRENT_CU,
      itemCode
    };
    expect(actions.replaceCurrentCU(itemCode)).to.deep.equal(expectedAction);
  });

  it('should create an action to set the business activity description', () => {
    const value = 'test';
    const expectedAction = {
      type: types.SET_BUSINESS_ACTIVITY_DESCRIPTION,
      value
    };
    expect(actions.setBusinessActivityDescription(value)).to.deep.equal(expectedAction);
  });
  
  describe('should create an action to search for CU\'s that', () => {

    var searchText = "test";
    var apiHost = "https://test-api.com/";
    var filters = "filter[include]=cu&filter[include]=anzsic&filter[include]=bicrefs&filter[include]=historyBic";
    var responseData = {bics: []};

    it('should handle success', () => {
      mock.onGet(`${apiHost}bics/search?term=test&${filters}`).reply(200, responseData);
      const action = actions.searchCU(searchText,apiHost);

      expect(action.type).to.equal(types.SEARCH_CU);
      return action.payload.should.eventually.have.property('data', responseData.bics);
    });

    it('should handle failure', () => {
      mock.onGet(`${apiHost}bics/search?term=test&${filters}`).reply(500);
      return actions.searchCU(searchText,apiHost).payload.should.be.rejected;
    });

  });

  describe('should create an action to search for a CU by ID that', () => {

    var searchText = "test";
    var apiHost = "https://test-api.com/";
    var filters = "filter[include]=cu&filter[include]=anzsic&filter[include]=bicrefs&filter[include]=historyBic";
    var responseData = {};

    it('should handle success', () => {
      mock.onGet(`${apiHost}bics/test?${filters}`).reply(200, responseData);
      const action = actions.searchCUByID(searchText,apiHost);

      expect(action.type).to.equal(types.SEARCH_CU);
      return action.payload.should.eventually.have.deep.property('data[0]', responseData);
    });

    it('should handle failure', () => {
      mock.onGet(`${apiHost}bics/test?${filters}`).reply(500);
      return actions.searchCUByID(searchText,apiHost).payload.should.be.rejected;
    });

  });

});
