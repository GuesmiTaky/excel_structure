import {
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,

    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_RESET,

    CATEGORY_DELETE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_RESET,

    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    
    CATEGORY_GET_MODEL_FAIL,
    CATEGORY_GET_MODEL_REQUEST,
    CATEGORY_GET_MODEL_SUCCESS,

} from "../const/categoryConstants";

export const categoryListReducer = (state = { loading: false, success: false, categorys: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, success: false };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, success: true, categorys: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const categoryCreateReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return { loading: true, success: false };
        case CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true };
        case CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case CATEGORY_CREATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const categoryDeleteReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return { loading: true, success: false };
        case CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true };
        case CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };
        case CATEGORY_DELETE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const categoryUpdateReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return { loading: true, success: false };
        case CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };
        case CATEGORY_UPDATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const categoryGetModelReducer = (state = {
    loading: false, success: false
}, action) => {

    switch (action.type) {
        case CATEGORY_GET_MODEL_REQUEST:
            return { loading: true, success: false };
        case CATEGORY_GET_MODEL_SUCCESS:
            return { loading: false, success: true };
        case CATEGORY_GET_MODEL_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};
