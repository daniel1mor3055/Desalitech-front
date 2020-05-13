import React, { Component, useEffect } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl'
import "assets/vendors/style"
import cyanTheme from './themes/cyanTheme';
import AppLocale from '../lngProvider';

import SystemSelect from 'app/routes/SystemSelect/index';
import MainApp from 'app/index';
import RTL from 'util/RTL';
import asyncComponent from 'util/asyncComponent';
import config from '../auth_config';
import { Auth0Provider, useAuth0 } from '../Auth0Provider';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const App = ({ match, location, locale, isDirectionRTL }) =>  {
  console.log(useAuth0);
  const { loading, loginWithRedirect, isAuthenticated } = useAuth0();
  useEffect(() => {
    document.body.classList.add('cyan');
  }, []);

  if (!loading && !isAuthenticated) {
    loginWithRedirect({});
    return null;
  }
  const applyTheme = createMuiTheme(cyanTheme);
  // if (location.pathname === '/') {
  //   return ( <Redirect to={'/app/system-select'}/> );
  // }

  if (isDirectionRTL) {
    applyTheme.direction = 'rtl';
    document.body.classList.add('rtl')
  } else {
    document.body.classList.remove('rtl');
    applyTheme.direction = 'ltr';
  }

  const currentAppLocale = AppLocale[locale.locale];

  return (
        <MuiThemeProvider theme={applyTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}>
              <RTL>
                <div className="app-main">
                  <Switch>
                    <Route path={`${match.url}app/system-select`} component={SystemSelect} />
                    <Route path={`${match.url}app`} component={MainApp} />
                    <Route
                        component={asyncComponent(() => import('components/Error404'))} />
                  </Switch>
                </div>
              </RTL>
            </IntlProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
  );
};

const mapStateToProps = ({ settings }) => {
    const { sideNavColor, locale, isDirectionRTL } = settings;
    return { sideNavColor, locale, isDirectionRTL }
};

export default connect(mapStateToProps)(App);

