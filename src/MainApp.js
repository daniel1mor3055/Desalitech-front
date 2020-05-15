import React, {Component} from 'react';
import {ConnectedRouter, connectRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import configureStore, {history} from './store';
import './firebase/firebase';
import App from './containers/App';
import config from './auth_config';
import {Auth0Provider} from './Auth0Provider';
import asyncComponent from 'util/asyncComponent';

export const store = configureStore();

class MainApp extends Component {

    onRedirectCallback = (appState) => {
        history.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );

        console.log(appState);
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
                            component={asyncComponent(() => import('components/Error404'))}/>
                    </Switch>
                </Auth0Provider>
            </ConnectedRouter>
        </Provider>);
    }
}

export default MainApp;