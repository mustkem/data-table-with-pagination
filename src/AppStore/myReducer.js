import { actionTypes } from './actionTypes';

const initialState = {
    userList:[],
    page:1
};

export default function myReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_TABLE_LIST:
        return {
            ...state,
            userList:action.payload
        };
        case actionTypes.SET_PAGINATION:
            console.log("test",action.payload)
        return {
            ...state,
            ...action.payload
        };
        

        default:
            return {...state}
        }
    }