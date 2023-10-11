import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,

} from "../const/userConst.js";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT_REQUEST:
            return {};
        case USER_LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
};

 