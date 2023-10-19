import { GET_PROJECTS, CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from '../actiontypes';
import axios from 'axios';

export const getProjects = () => {
  return dispatch => {
    return axios.get("http://localhost:5000/projects").then((response) => {
      console.log(response);
      dispatch({ type: GET_PROJECTS, payload: response.data });
    }).catch(e => console.log(e.message, e))
  }
}

export const createProject = (data) => {
  return dispatch => {
    return axios.post("http://localhost:5000/projects/create", data).then((response) => {
      console.log(response);
      dispatch({ type: CREATE_PROJECT, payload: response.data });
    }).catch(e => console.log(e.message, data, e))
  }
}

export const updateProject = (data) => {
  return dispatch => {
    return axios.post("http://localhost:5000/projects/update", data).then((response) => {
      console.log(response);
      dispatch({ type: UPDATE_PROJECT, payload: response.data });
    }).catch(e => console.log(e.message, e))
  }
}

export const deleteProject = (data) => {
  return dispatch => {
    return axios.delete("http://localhost:5000/projects/delete", { data }).then((response) => {
      console.log(response);
      dispatch({ type: DELETE_PROJECT, payload: response.data });
    }).catch(e => console.log(e.message, e))
  }
}