import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import systemSelectReducer from './systemSelect'
import alarmsListReducer from './alarmsList'
import tagsListReducer from './tagsList'


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  systemSelect: systemSelectReducer,
  alarmsList: alarmsListReducer,
  tagsList: tagsListReducer,
});
