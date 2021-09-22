// import { reduce, reduceRight } from 'async'
import axios from 'axios'

const initialState = {
    user:{
        user_name:null,
        profile_pic:null
    }
}

const UPDATE_USER = "UPDATE_USER"
const LOGOUT = "LOGOUT"

export function updateUser(user_name,profile_pic) {
    return {
        type: UPDATE_USER,
        // payload: axios.post('/api/auth/login', {user_name,password})
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
            const { profile_pic,user_name } = action.payload.data
            return {
               profile_pic,user_name
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