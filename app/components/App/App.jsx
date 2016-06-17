//
//
//              Created by
//            __ _____ __    _____ _____    _____ _____    __ _____
//         __|  |  |  |  |  |   __|   | |  | __  |     |__|  |     |
//        |  |  |  |  |  |__|   __| | | |  |    -|  |  |  |  |  |  |
//        |_____|_____|_____|_____|_|___|  |__|__|_____|_____|_____|
//
//                on 02/05/2016
//                   isusk246@gmail.com
//
//


import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as appActions from '../../redux/actions/app.actions';
import Window from '../../util/Window';

// SASS Stylesheets
import './app.scss';

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

function mapStateToProps(state) {
  return {
    Refresh: state._app.refresh,
    PageHeader: state._app.pageHeader,
    PanelActive: state._app.panelActive,
    PanelContent: state._app.panelContent,
    Register: state._app.register,
    LoggedIn: state._app.loggedIn,
    Spinner: state._app.spinner,
    FetchingParties: state._app.fetchingParties,
    FetchingAccount: state._app.fetchingAccount,
    ConfirmingCoverDetails: state._app.confirmingCoverDetails,
    ConfirmCoverDetailsSuccess: state._app.confirmCoverDetailsSuccess,
    ACCNumber: state._app.accNumber,
    AccountName: state._app.accountName,
    TaxYear: state._app.taxYear,
    EmploymentStatus: state._app.employmentStatus,
    LevyClassificationCode: state._app.levyClassification.code,
    LevyClassificationDescription: state._app.levyClassification.description,
    SearchCUValue: state._app.levySearch.searchCUValue,
    SearchResults: state._app.levySearch.searchResults,
    Searching: state._app.levySearch.searching,
    CUChanged: state._app.cuChanged,
    BICHost: state._app.bicHost,
    Customer: state._app.customer,
    RegistrationError: state._app.registrationError,
    SorryError: state._app.sorryError,
  };
}

export class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.LoggedIn && nextProps.ConfirmCoverDetailsSuccess) {
      // log user out of OpenAM
      this.props.logout();
    }
    var header;
    if (nextProps.LoggedIn) {
      document.title = "MyACC - Your cover details";
      header = "Your cover details";
    } else if (nextProps.ConfirmCoverDetailsSuccess) {
      header = "MyACC";
    } else {
      document.title = "MyACC - Welcome";
      header = "Welcome to MyACC";
    }
    if (header != this.props.PageHeader) {
      // update page header
      this.props.pageHeader(header);
    }
  }
  componentDidMount() {
    var returnedFromRealMe = Window.location().href.indexOf("#CoverDetails") > -1 && !this.props.LoggedIn;
    if (returnedFromRealMe) {
      this.props.fetchParties();
    } else if (this.props.LoggedIn === undefined) {
      // force logout of any existing OpenAM session
      this.props.logout();
    }
  }
  render() {
    let MaskClasses = classNames({
          'panel-mask': true,
          'active': this.props.PanelActive
      });
    let SpinClasses = classNames({
          'wf-loading': this.props.Spinner
      });
    return (
      <div className={SpinClasses}>
        <span className="loading-mask" />
        <div className={ MaskClasses } onClick={() => maskPanelClick(this.props)} />
        <Header {...this.props} />
        <div  className="main-content">
          <div className="container">
            {
              this.mainPage()
            }
          </div>
          <Panel className="panel--slide-right" {...this.props} >
            {
              panelContent(this.props.PanelContent, this.props)
            }
          </Panel>
        </div>
        <Footer {...this.props} />
      </div>
    );
  }
  mainPage() {
    if (this.props.SorryError) {
      return <Sorry {...this.props} />;
    }
    if (this.props.LoggedIn) {
      if (this.props.FetchingParties || this.props.FetchingAccount) {
        return '';
      }
      return <CoverDetails {...this.props} />;
    }
    if (this.props.ConfirmCoverDetailsSuccess) {
      return <Thanks {...this.props} />;
    }
    return <Login {...this.props} />;
  }
}

const panelContent = (content, props) => {
  switch(content) {
    case 'ACCCover':
      return (<ACCCover {...props}/>);
      break;
      // case 'TermsOfUse':
      //   return (<TermsOfUse {...props} />);
      //   break;
    case 'WhatsRealMe':
      return (<WhatsRealMe {...props}/>);
      break;
    case 'LevySearch':
      return(<LevySearch {...props} />);
      break;
    case 'LevySearchResults':
      return(<LevySearchResults {...props} />);
  }
};

App.contextTypes = {
  store: React.PropTypes.object
};

export const maskPanelClick = (props) => {
  props.switchPanel();
};

export default connect(
    mapStateToProps, {
    ...appActions
  }
)(App);
