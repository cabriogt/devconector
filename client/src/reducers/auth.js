import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,  
    ACCOUNT_DELETED
} from "../actions/types";

const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null,


};

function authReducer (state = initialState,action){

    const {type,payload} = action;

    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.getItem('token',payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null
            }
        default:
        return state;
    }

}

export default authReducer;