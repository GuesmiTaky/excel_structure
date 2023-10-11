import {
    PROJECT_UPDATE_REQUEST,
    PROJECT_UPDATE_SUCCESS,
    PROJECT_UPDATE_FAIL,
    PROJECT_UPDATE_RESET,

    PROJECT_CREATE_FAIL,
    PROJECT_CREATE_REQUEST,
    PROJECT_CREATE_SUCCESS,
    PROJECT_CREATE_RESET,

    PROJECT_DELETE_FAIL,
    PROJECT_DELETE_REQUEST,
    PROJECT_DELETE_SUCCESS,
    PROJECT_DELETE_RESET,

    PROJECT_LIST_FAIL,
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_SUCCESS,

    PROJECT_GET_MODEL_FAIL,
    PROJECT_GET_MODEL_REQUEST,
    PROJECT_GET_MODEL_SUCCESS,

} from "../const/projectConstants";

export const projectListReducer = (state = { loading: false, success: false, projects: [] }, action) => {
    switch (action.type) {
        case PROJECT_LIST_REQUEST:
            return { loading: true, success: false };
        case PROJECT_LIST_SUCCESS:
            return { loading: false, success: true, projects: action.payload };
        case PROJECT_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const projectCreateReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case PROJECT_CREATE_REQUEST:
            return { loading: true, success: false };
        case PROJECT_CREATE_SUCCESS:
            return { loading: false, success: true };
        case PROJECT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PROJECT_CREATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const projectDeleteReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case PROJECT_DELETE_REQUEST:
            return { loading: true, success: false };
        case PROJECT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PROJECT_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };
        case PROJECT_DELETE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const projectUpdateReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case PROJECT_UPDATE_REQUEST:
            return { loading: true, success: false };
        case PROJECT_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case PROJECT_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };
        case PROJECT_UPDATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const projectGetModelReducer = (state = {
    loading: false, success: false
}, action) => {

    switch (action.type) {
        case PROJECT_GET_MODEL_REQUEST:
            return { loading: true, success: false };
        case PROJECT_GET_MODEL_SUCCESS:
            return { loading: false, success: true };
        case PROJECT_GET_MODEL_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};
