import axiosClient, { apiUrl, api_Url } from "../const";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,

} from "../const/userConst";

import axios from "axios";

export const login = (data_form) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { data } = await axios.post(apiUrl + "/login", data_form);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", data.accessToken);
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    const { data } = await axiosClient.get(api_Url + "/logout");
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: data });
    localStorage.removeItem("userInfo");
};

