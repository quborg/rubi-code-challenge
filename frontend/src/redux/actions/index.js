import { GET_PROJECTS, CREATE_PROJECT, DELETE_PROJECT, EDIT_PROJECT } from '../actiontypes';
import axios from 'axios';

export const getProjects = () => {
  return dispatch => {
    return axios.get("http://localhost:5000/projects").then((response) => {
      console.log(response);
      dispatch({ type: GET_PROJECTS, payload: response.data });
    })
  }
}

export const createProject = (data) => {
  return dispatch => {
    return axios.post("http://localhost:5000/projects/create", data).then((response) => {
      console.log(response);
      dispatch({ type: CREATE_PROJECT, payload: response.data });
    })
  }
}

export const updateProject = (data) => {
  return dispatch => {
    return axios.post("http://localhost:5000/projects/update", data).then((response) => {
      console.log(response);
      dispatch({ type: EDIT_PROJECT, payload: response.data });
    })
  }
}

export const deleteProject = (id) => {
  return dispatch => {
    return axios.post("http://localhost:5000/projects/delete", { id }).then((response) => {
      console.log(response);
      dispatch({ type: DELETE_PROJECT, payload: response.data });
    })
  }
}