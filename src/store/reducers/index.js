import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import systemSelectReducer from './systemsAndLiveAlarms'
import alarmsListReducer from './alarmsList'
import tagsListReducer from './tagsList'
import adminReducer from './admin'


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  systemSelect: systemSelectReducer,
  alarmsList: alarmsListReducer,
  tagsList: tagsListReducer,
  admin: adminReducer,
});
