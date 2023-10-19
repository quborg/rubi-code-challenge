import { GET_TASKS, CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '../actiontypes';
import axios from 'axios';

export const getTasks = () => {
  return dispatch => {
    return axios.get("http://localhost:5000/tasks").then((response) => {
      console.log(response);
      dispatch({ type: GET_TASKS, payload: response.data });
    }).catch(e => console.log(e.message, e))
  }
}

export const createTask = (data) => {
  console.log('createTask', data);
  return dispatch => {
    return axios.post("http://localhost:5000/tasks/create", data).then((response) => {
      console.log(response);
      dispatch({ type: CREATE_TASK, payload: response.data });
    }).catch(e => console.log(e.message, data, e))
  }
}

export const updateTask = (data) => {
  return dispatch => {
    return axios.post("http://localhost:5000/tasks/update", data).then((response) => {
      console.log(response);
      dispatch({ type: UPDATE_TASK, payload: response.data });
    }).catch(e => console.log(e.message, e))
  }
}

export const deleteTask = (data) => {
  return dispatch => {
    return axios.delete("http://localhost:5000/tasks/delete", { data }).then((response) => {
      console.log(response);
      dispatch({ type: DELETE_TASK, payload: response.data });
    }).catch(e => console.log(e.message, e))
  }
}