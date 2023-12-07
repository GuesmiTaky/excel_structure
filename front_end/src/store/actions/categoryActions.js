import axiosClient from "../const";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_GET_MODEL_FAIL,
  CATEGORY_GET_MODEL_REQUEST,
  CATEGORY_GET_MODEL_SUCCESS,
  CATEGORY_CREATE_RESET,
  CATEGORY_UPDATE_RESET,
  CATEGORY_DELETE_RESET,
} from "../const/categoryConstants";

//function get all
export const listCategoryAction =
  (currentPage, perPage) => async (dispatch) => {
    try {
      dispatch({
        type: CATEGORY_LIST_REQUEST,
      });

      const response = await axiosClient.get(
        "/categorie?page=" + currentPage + "&per_page=" + perPage
      );
      if (response.status === 200) {
        await dispatch({
          type: CATEGORY_LIST_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CATEGORY_LIST_FAIL,
        payload: message,
      });
    }
  };

//function get by id
export const getModelCategoryAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_GET_MODEL_REQUEST,
    });

    const { data } = await axiosClient.get(`/categorie/ ${id}`);

    dispatch({
      type: CATEGORY_GET_MODEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_GET_MODEL_FAIL,
      payload: message,
    });
  }
};

//function create action dans redux
export const createCategoryAction = (category) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    });
    const response = await axiosClient.post(`/categorie`, category);

    if (response.status === 201) {
      await dispatch({
        type: CATEGORY_CREATE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};

//function reset create
export const resetCategoryCreate = () => {
  return { type: CATEGORY_CREATE_RESET };
};

//function delete
export const deleteCategoryAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });
    const response = await axiosClient.delete(`/categorie/${id}`);
    if (response.status === 204) {
      dispatch({
        type: CATEGORY_DELETE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};

//function reset delete
export const resetCategoryDelete = () => {
  return { type: CATEGORY_DELETE_RESET };
};

//function update
export const updateCategoryAction = (id, category) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
    });
    const response = await axiosClient.put(`/categorie/${id}`, category);
    if (response.status === 200) {
      dispatch({
        type: CATEGORY_UPDATE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: message,
    });
  }
};

//function reset create
export const resetCategoryUpdate = () => {
  return { type: CATEGORY_UPDATE_RESET };
};

export const removeJwt = () => {
  localStorage.removeItem("userInfo");
};
