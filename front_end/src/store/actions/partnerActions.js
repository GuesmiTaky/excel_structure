import axiosClient from "../const";
import {
    PARTNER_CREATE_FAIL,
    PARTNER_CREATE_REQUEST,
    PARTNER_CREATE_SUCCESS,
    PARTNER_DELETE_FAIL,
    PARTNER_DELETE_REQUEST,
    PARTNER_DELETE_SUCCESS,
    PARTNER_LIST_FAIL,
    PARTNER_LIST_REQUEST,
    PARTNER_LIST_SUCCESS,
    PARTNER_UPDATE_FAIL,
    PARTNER_UPDATE_REQUEST,
    PARTNER_UPDATE_SUCCESS,
    PARTNER_GET_MODEL_FAIL,
    PARTNER_GET_MODEL_REQUEST,
    PARTNER_GET_MODEL_SUCCESS,
    PARTNER_CREATE_RESET,
    PARTNER_UPDATE_RESET,
    PARTNER_DELETE_RESET,
} from "../const/partnerConstants";

//function get all
export const listPartnerAction = (currentPage, perPage) => async (dispatch) => {

    try {
        dispatch({
            type: PARTNER_LIST_REQUEST,
        });

        const response = await axiosClient.get("/partner?page=" +
            currentPage +
            "&per_page=" +
            perPage);
        if (response.status === 200) {
            await dispatch({
                type: PARTNER_LIST_SUCCESS,
                payload: response.data,
            });
        }

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PARTNER_LIST_FAIL,
            payload: message,
        });
    }
};

//function get by id
export const getModelPartnerAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PARTNER_GET_MODEL_REQUEST,
        });

        const { data } = await axiosClient.get(`/partner/ ${id}`);

        dispatch({
            type: PARTNER_GET_MODEL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PARTNER_GET_MODEL_FAIL,
            payload: message,
        });
    }
};

//function create action dans redux
export const createPartnerAction = (partner) => async (
    dispatch
) => {
    try {
        dispatch({
            type: PARTNER_CREATE_REQUEST,
        });
        const response = await axiosClient.post(
            `/partner`,
            partner
        );

        if (response.status === 201) {
            await dispatch({
                type: PARTNER_CREATE_SUCCESS,
                payload: response.data,
            });
        }


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PARTNER_CREATE_FAIL,
            payload: message,
        });
    }

};

//function reset create
export const resetPartnerCreate = () => {
    return { type: PARTNER_CREATE_RESET };
};

//function delete
export const deletePartnerAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PARTNER_DELETE_REQUEST,
        });
        const response = await axiosClient.delete(`/partner/${id}`);
        if (response.status === 204) {
            dispatch({
                type: PARTNER_DELETE_SUCCESS,
                payload: response.data,
            });
        }

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PARTNER_DELETE_FAIL,
            payload: message,
        });
    }
};

//function reset delete
export const resetPartnerDelete = () => {
    return { type: PARTNER_DELETE_RESET };
};


//function update
export const updatePartnerAction = (id, partner) => async (
    dispatch,
) => {
    try {
        dispatch({
            type: PARTNER_UPDATE_REQUEST,
        });
        const response = await axiosClient.put(
            `/partner/${id}`,
            partner

        );
        if (response.status === 200) {
            dispatch({
                type: PARTNER_UPDATE_SUCCESS,
                payload: response.data,
            });
        }

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PARTNER_UPDATE_FAIL,
            payload: message,
        });
    }
};

//function reset create
export const resetPartnerUpdate = () => {
    return { type: PARTNER_UPDATE_RESET };
};
