import { combineReducers } from 'redux';
import myReducer from './myReducer';
const rootReducer = combineReducers({
    tableListReducer: myReducer
})
export default rootReducer;