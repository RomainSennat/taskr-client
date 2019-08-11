import { combineReducers } from 'redux';
import tasks from './reducers/tasks';

const reducers = combineReducers({ tasks });
export default reducers;
