import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import settings from './Settings';
import systems from './systemsAndLiveAlarms';
import alarms from './alarmsList';
import tags from './tagsList';
import auth from './auth';
import poll from './polling';
import dashboard from './dashboard';
import header from './header';
import charts from './charts';


export default (history) => combineReducers({
    router: connectRouter(history),
    settings: settings,
    systems: systems,
    alarms: alarms,
    tags: tags,
    auth: auth,
    poll: poll,
    dashboard: dashboard,
    header: header,
    charts: charts,
});
