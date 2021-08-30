// import { reduce, reduceRight } from 'async'
import axios from 'axios'

const initialState = {
    user:{}
}

const UPDATE_USER = "UPDATE_USER"
const LOGOUT = "LOGOUT"

export function updateUser(user_name,profile_pic) {
    return {
        type: UPDATE_USER,
        payload: user_name,profile_pic
    }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: {}
    }
}

export default function reducer(state = initialState,action) {
    switch (action.type) {
        case UPDATE_USER + 'FULFILLED':
            return {
                ...state,
                user: action.payload.data
        }
        case UPDATE_USER + '_REJECTED':
            return {
                ...state,
                user:{}
            }
        case LOGOUT + '_FULFILLED':
            return {
                ...state,
                user: {}
            }
        default:
            return state;
    }
        
}