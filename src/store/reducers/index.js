import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import systemSelectReducer from './systemSelect'


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  systemSelect: systemSelectReducer
});
