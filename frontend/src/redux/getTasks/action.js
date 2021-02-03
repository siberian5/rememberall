/* eslint-disable no-debugger */
import axios from "axios";
import types from "../constants/types";

const showListTasksSuccess = (tasks) => ({
  type: types.SHOW_LIST_TASKS_SUCCESS,
  payload: tasks,
});

const showListTasksStarted = () => ({
  type: types.SHOW_LIST_TASKS_STARTED,
});

const showListTasksFailure = (error) => ({
  type: types.SHOW_LIST_TASKS_FAILURE,
  payload: {
    error,
  },
});

const showListTasks = () => (dispatch) => {
  dispatch(showListTasksStarted());
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      dispatch(showListTasksSuccess(res.data));
    })
    .catch((err) => {
      dispatch(showListTasksFailure(err.message));
    });
};

export default showListTasks;
