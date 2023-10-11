import {
    NEWS_UPDATE_REQUEST,
    NEWS_UPDATE_SUCCESS,
    NEWS_UPDATE_FAIL,
    NEWS_UPDATE_RESET,

    NEWS_CREATE_FAIL,
    NEWS_CREATE_REQUEST,
    NEWS_CREATE_SUCCESS,
    NEWS_CREATE_RESET,

    NEWS_DELETE_FAIL,
    NEWS_DELETE_REQUEST,
    NEWS_DELETE_SUCCESS,
    NEWS_DELETE_RESET,

    NEWS_LIST_FAIL,
    NEWS_LIST_REQUEST,
    NEWS_LIST_SUCCESS,

    NEWS_GET_MODEL_FAIL,
    NEWS_GET_MODEL_REQUEST,
    NEWS_GET_MODEL_SUCCESS,

} from "../const/newsConstants";

export const newsListReducer = (state = { loading: false, success: false, newss: [] }, action) => {
    switch (action.type) {
        case NEWS_LIST_REQUEST:
            return { loading: true, success: false };
        case NEWS_LIST_SUCCESS:
            return { loading: false, success: true, newss: action.payload };
        case NEWS_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const newsCreateReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case NEWS_CREATE_REQUEST:
            return { loading: true, success: false };
        case NEWS_CREATE_SUCCESS:
            return { loading: false, success: true };
        case NEWS_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case NEWS_CREATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const newsDeleteReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case NEWS_DELETE_REQUEST:
            return { loading: true, success: false };
        case NEWS_DELETE_SUCCESS:
            return { loading: false, success: true };
        case NEWS_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };
        case NEWS_DELETE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const newsUpdateReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case NEWS_UPDATE_REQUEST:
            return { loading: true, success: false };
        case NEWS_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case NEWS_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };
        case NEWS_UPDATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const newsGetModelReducer = (state = {
    loading: false, success: false
}, action) => {

    switch (action.type) {
        case NEWS_GET_MODEL_REQUEST:
            return { loading: true, success: false };
        case NEWS_GET_MODEL_SUCCESS:
            return { loading: false, success: true };
        case NEWS_GET_MODEL_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};
