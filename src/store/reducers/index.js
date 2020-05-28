import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import settings from './Settings';
import systems from './systemsAndLiveAlarms';
import alarms from './alarmsList';
import tags from './tagsList';
import auth from './auth';
import admin from './admin';
import poll from './polling';
import dashboard from './dashboard';


export default (history) => combineReducers({
    router: connectRouter(history),
    settings: settings,
    systems: systems,
    alarms: alarms,
    tags: tags,
    auth: auth,
    admin: admin,
    poll: poll,
    dashboard: dashboard,
});
