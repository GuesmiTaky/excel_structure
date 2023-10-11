import {
    PARTNER_UPDATE_REQUEST,
    PARTNER_UPDATE_SUCCESS,
    PARTNER_UPDATE_FAIL,
    PARTNER_UPDATE_RESET,

    PARTNER_CREATE_FAIL,
    PARTNER_CREATE_REQUEST,
    PARTNER_CREATE_SUCCESS,
    PARTNER_CREATE_RESET,

    PARTNER_DELETE_FAIL,
    PARTNER_DELETE_REQUEST,
    PARTNER_DELETE_SUCCESS,
    PARTNER_DELETE_RESET,

    PARTNER_LIST_FAIL,
    PARTNER_LIST_REQUEST,
    PARTNER_LIST_SUCCESS,

    PARTNER_GET_MODEL_FAIL,
    PARTNER_GET_MODEL_REQUEST,
    PARTNER_GET_MODEL_SUCCESS,

} from "../const/partnerConstants";

export const partnerListReducer = (state = { loading: false, success: false, partners: [] }, action) => {
    switch (action.type) {
        case PARTNER_LIST_REQUEST:
            return { loading: true, success: false };
        case PARTNER_LIST_SUCCESS:
            return { loading: false, success: true, partners: action.payload };
        case PARTNER_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const partnerCreateReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case PARTNER_CREATE_REQUEST:
            return { loading: true, success: false };
        case PARTNER_CREATE_SUCCESS:
            return { loading: false, success: true };
        case PARTNER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PARTNER_CREATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const partnerDeleteReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case PARTNER_DELETE_REQUEST:
            return { loading: true, success: false };
        case PARTNER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PARTNER_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };
        case PARTNER_DELETE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const partnerUpdateReducer = (state = {
    loading: false, success: false
}, action) => {
    switch (action.type) {
        case PARTNER_UPDATE_REQUEST:
            return { loading: true, success: false };
        case PARTNER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case PARTNER_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };
        case PARTNER_UPDATE_RESET:
            return { loading: false, success: false };
        default:
            return state;
    }
};

export const partnerGetModelReducer = (state = {
    loading: false, success: false
}, action) => {

    switch (action.type) {
        case PARTNER_GET_MODEL_REQUEST:
            return { loading: true, success: false };
        case PARTNER_GET_MODEL_SUCCESS:
            return { loading: false, success: true };
        case PARTNER_GET_MODEL_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};
