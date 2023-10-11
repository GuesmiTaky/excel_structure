import axiosClient from "../const";
import {
    NEWS_CREATE_FAIL,
    NEWS_CREATE_REQUEST,
    NEWS_CREATE_SUCCESS,
    NEWS_DELETE_FAIL,
    NEWS_DELETE_REQUEST,
    NEWS_DELETE_SUCCESS,
    NEWS_LIST_FAIL,
    NEWS_LIST_REQUEST,
    NEWS_LIST_SUCCESS,
    NEWS_UPDATE_FAIL,
    NEWS_UPDATE_REQUEST,
    NEWS_UPDATE_SUCCESS,
    NEWS_GET_MODEL_FAIL,
    NEWS_GET_MODEL_REQUEST,
    NEWS_GET_MODEL_SUCCESS,
    NEWS_CREATE_RESET,
    NEWS_UPDATE_RESET,
    NEWS_DELETE_RESET,
} from "../const/newsConstants";

//function get all
export const listNewsAction = (currentPage, perPage) => async (dispatch) => {

    try {
        dispatch({
            type: NEWS_LIST_REQUEST,
        });

        const response = await axiosClient.get("/news?page=" +
            currentPage +
            "&per_page=" +
            perPage);

        if (response.status === 200) {
            await dispatch({
                type: NEWS_LIST_SUCCESS,
                payload: response.data,
            });
        }

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: NEWS_LIST_FAIL,
            payload: message,
        });
    }
};

//function get by id
export const getModelNewsAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: NEWS_GET_MODEL_REQUEST,
        });

        const { data } = await axiosClient.get(`/news/ ${id}`);

        dispatch({
            type: NEWS_GET_MODEL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: NEWS_GET_MODEL_FAIL,
            payload: message,
        });
    }
};

//function create action dans redux
export const createNewsAction = (news) => async (
    dispatch
) => {
    try {
        dispatch({
            type: NEWS_CREATE_REQUEST,
        });
        const response = await axiosClient.post(
            `/news`,
            news
        );

        if (response.status === 201) {
            await dispatch({
                type: NEWS_CREATE_SUCCESS,
                payload: response.data,
            });
        }


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: NEWS_CREATE_FAIL,
            payload: message,
        });
    }

};

//function reset create
export const resetNewsCreate = () => {
    return { type: NEWS_CREATE_RESET };
};

//function delete
export const deleteNewsAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: NEWS_DELETE_REQUEST,
        });
        const response = await axiosClient.delete(`/news/${id}`);
        if (response.status === 204) {
            dispatch({
                type: NEWS_DELETE_SUCCESS,
                payload: response.data,
            });
        }

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: NEWS_DELETE_FAIL,
            payload: message,
        });
    }
};

//function reset delete
export const resetNewsDelete = () => {
    return { type: NEWS_DELETE_RESET };
};


//function update
export const updateNewsAction = (id, news) => async (
    dispatch,
) => {
    try {
        dispatch({
            type: NEWS_UPDATE_REQUEST,
        });
        const response = await axiosClient.put(
            `/news/${id}`,
            news

        );
        if (response.status === 200) {
            dispatch({
                type: NEWS_UPDATE_SUCCESS,
                payload: response.data,
            });
        }

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: NEWS_UPDATE_FAIL,
            payload: message,
        });
    }
};

//function reset create
export const resetNewsUpdate = () => {
    return { type: NEWS_UPDATE_RESET };
};
