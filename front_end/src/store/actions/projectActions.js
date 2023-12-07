import axiosClient from "../const";
import {
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_GET_MODEL_FAIL,
  PROJECT_GET_MODEL_REQUEST,
  PROJECT_GET_MODEL_SUCCESS,
  PROJECT_CREATE_RESET,
  PROJECT_UPDATE_RESET,
  PROJECT_DELETE_RESET,
} from "../const/projectConstants";

//function get all
export const listProjectAction = (currentPage, perPage) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_LIST_REQUEST,
    });

    const response = await axiosClient.get(
      "/project?page=" + currentPage + "&per_page=" + perPage
    );

    if (response.status === 200) {
      await dispatch({
        type: PROJECT_LIST_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload: message,
    });
  }
};

//function get by id
export const getModelProjectAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_GET_MODEL_REQUEST,
    });

    const { data } = await axiosClient.get(`/project/ ${id}`);

    dispatch({
      type: PROJECT_GET_MODEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROJECT_GET_MODEL_FAIL,
      payload: message,
    });
  }
};

//function create action dans redux
export const createProjectAction = (project) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_CREATE_REQUEST,
    });
    const response = await axiosClient.post(`/project`, project);

    if (response.status === 201) {
      await dispatch({
        type: PROJECT_CREATE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload: message,
    });
  }
};

//function reset create
export const resetProjectCreate = () => {
  return { type: PROJECT_CREATE_RESET };
};

//function delete
export const deleteProjectAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_DELETE_REQUEST,
    });
    const response = await axiosClient.delete(`/project/${id}`);
    if (response.status === 204) {
      dispatch({
        type: PROJECT_DELETE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload: message,
    });
  }
};

//function reset delete
export const resetProjectDelete = () => {
  return { type: PROJECT_DELETE_RESET };
};

//function update
export const updateProjectAction = (id, project) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_UPDATE_REQUEST,
    });
    const response = await axiosClient.put(`/project/${id}`, project);
    if (response.status === 200) {
      dispatch({
        type: PROJECT_UPDATE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload: message,
    });
  }
};

//function reset create
export const resetProjectUpdate = () => {
  return { type: PROJECT_UPDATE_RESET };
};

export const removeJwt = () => {
  localStorage.removeItem("userInfo");
};
