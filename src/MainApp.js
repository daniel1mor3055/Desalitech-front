import React, { Component } from 'react';
import { ConnectedRouter, connectRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import configureStore, { history } from './store';
import './firebase/firebase';
import App from './containers/App';
import config from './auth_config';
import { Auth0Provider } from './Auth0Provider';

export const store = configureStore();

class MainApp extends Component {

    onRedirectCallback = (appState) => {
        history.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : '/app/system-select'
        );

        console.log(appState);
    };

    render() {
        return (<Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Auth0Provider
                        domain={config.domain}
                        client_id={config.clientId}
                        redirect_uri={window.location.origin}
                        audience={config.audience}
                        onRedirectCallback={this.onRedirectCallback}>
                        <Route path="/" component={App} />
                    </Auth0Provider>
                </Switch>
            </ConnectedRouter>
        </Provider>);
    }
}

export default MainApp;