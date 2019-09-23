import { actionTypes } from './actionTypes';
import axios from 'axios';

export function getList() {
    return (dispatch, getState) => {
        axios.get('https://demo9197058.mockable.io/users')
            .then(function (response) {
                dispatch(setList(response.data));

            })
            .catch(function (error) {
                console.log(error);
            })
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
