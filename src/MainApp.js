import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import configureStore, { history } from './store';
import App from './containers/App';
import config from './auth_config';
import Auth0Provider from './Auth0Provider';
import asyncComponent from 'util/asyncComponent';
import { NotificationContainer } from "react-notifications";

export const store = configureStore();

class MainApp extends Component {

    onRedirectCallback = (appState) => {
        history.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    };

    render() {
        return (<Provider store={store}>
            <ConnectedRouter history={history}>
                <Auth0Provider
                    domain={config.domain}
                    client_id={config.clientId}
                    redirect_uri={window.location.origin}
                    audience={config.audience}
                    onRedirectCallback={this.onRedirectCallback}>
                    <Switch>
                        <Route path="/" component={App}/>
                        <Route
                            component={asyncComponent(() => import('app/components/Error404'))}/>
                    </Switch>
                </Auth0Provider>
                <NotificationContainer/>
            </ConnectedRouter>
        </Provider>);
    }
}

export default MainApp;