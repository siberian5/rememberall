import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import TasksList from "./TasksList/TasksList";
import "./TasksTabs.css";

const TasksTabs = () => (
  <div className="tasks-tabs">
    <Tabs defaultActiveKey="activetasks" id="uncontrolled-tab-example">
      <Tab eventKey="activetasks" title="Актуальные задачи">
        <TasksList isActive />
      </Tab>
      <Tab eventKey="inactivetasks" title="Завершенные задачи">
        <TasksList />
      </Tab>
    </Tabs>
  </div>
);

export default TasksTabs;
