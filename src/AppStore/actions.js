import axios from 'axios';
import { userList } from '../models/mock-data'
import { actionTypes } from './actionTypes';



export function getList() {
    return (dispatch, getState) => {
        return new Promise((res)=>{
            setTimeout(() => {
                dispatch(setList(userList));
            }, 1000);
        })
        // axios.get('https://jsonplaceholder.typicode.com/users')
        //     .then(function (response) {
        //         dispatch(setList(response.data));

        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    };
}

function setList(payload) {
    return {
        type: actionTypes.GET_TABLE_LIST,
        payload: payload
    };
}


export function paginationFunc(query) {
    return {
        type: actionTypes.SET_PAGINATION,
        payload: query
    };
}
