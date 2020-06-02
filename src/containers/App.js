import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';

import 'assets/vendors/style';
import AppLocale from 'lngProvider';
import RTL from 'util/RTL';
import {Auth0Context} from 'Auth0Provider';
import PrivateRoute from 'app/components/PrivateRoute';
import asyncComponent from 'util/asyncComponent';
import blueTheme from './themes/blueTheme';

class App extends Component {
    static contextType = Auth0Context;

    constructor(props) {
        super(props);

        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    }

    componentDidMount() {
        document.body.classList.add('blue');
    }

    render() {
        const {match, locale, isDirectionRTL} = this.props;
        const {loading, loginWithRedirect, isAuthenticated} = this.context;

        if (!isAuthenticated && !loading) {
            loginWithRedirect({});
            return null;
        }

        let redirect = null;
        if (isAuthenticated && !loading) {
            redirect = <Redirect exact from={'/'} to={'/app/system-select-active-alarms?currentTab=system_select'}/>;
        }


        const applyTheme = createMuiTheme(blueTheme);

        if (isDirectionRTL) {
            applyTheme.direction = 'rtl';
            document.body.classList.add('rtl');
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
                                    <PrivateRoute path={`${match.url}app/system-select-active-alarms`}
                                                  component={asyncComponent(() => import('../app/routes/SystemsAndLiveAlarms'))}/>
                                    <PrivateRoute path={`${match.url}app`}
                                                  component={asyncComponent(() => import('../app'))}/>
                                    {redirect}
                                </Switch>
                            </div>
                        </RTL>
                    </IntlProvider>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({settings}) => {
    const {sideNavColor, locale, isDirectionRTL} = settings;
    return {sideNavColor, locale, isDirectionRTL};
};

export default connect(mapStateToProps)(App);

