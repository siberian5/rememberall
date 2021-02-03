/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "react-bootstrap";
import Task from "./Task/Task";
import "./TasksList.css";

// eslint-disable-next-line no-unused-vars
const ActiveTasks = ({ tasks, isActive }) => (
  <div className="content">
    <Accordion defaultActiveKey="0">
      {tasks.map((task) => <Task id={task.id} title={task.name} description={task.username} isActive={isActive} />)}
    </Accordion>
  </div>
);

ActiveTasks.propTypes = {
  tasks: PropTypes.node,
  isActive: PropTypes.node,
};
ActiveTasks.defaultProps = {
  tasks: [],
  isActive: false,
};

export default ActiveTasks;
