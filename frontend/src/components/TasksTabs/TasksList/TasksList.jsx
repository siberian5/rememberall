import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "react-bootstrap";
import Task from "./Task/Task";
import "./TasksList.css";

const ActiveTasks = ({ isActive }) => (
  <div className="content">
    <Accordion defaultActiveKey="0">
      <Task id="1" title="Задача 1" description="Описание 1" isActive={isActive} />
      {/* <InactiveTask id="2" title="Задача 2" description="Описание 2" /> */}
    </Accordion>
  </div>
);

ActiveTasks.propTypes = {
  isActive: PropTypes.node,
};
ActiveTasks.defaultProps = {
  isActive: false,
};

export default ActiveTasks;
