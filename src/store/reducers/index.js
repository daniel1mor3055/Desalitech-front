import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import settings from './Settings';
import systems from './systemSelect'
import alarms from './alarmsList'
import tags from './tagsList'
import auth from './auth'


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: settings,
  systems: systems,
  alarms: alarms,
  tags: tags,
  auth: auth,
});
