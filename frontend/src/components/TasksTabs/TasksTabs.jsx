import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TasksList from "./TasksList/TasksList";
import "./TasksTabs.css";
import getTasks from "../../redux/getTasks/action";

function TasksTabs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const tasks = useSelector((state) => state.tasks);
  console.log(tasks);

  return (
    <div className="tasks-tabs">
      <Tabs defaultActiveKey="activetasks" id="uncontrolled-tab-example">
        <Tab eventKey="activetasks" title="Актуальные задачи">
          <TasksList tasks={tasks} isActive />
        </Tab>
        <Tab eventKey="inactivetasks" title="Завершенные задачи">
          <TasksList />
        </Tab>
      </Tabs>
    </div>
  );
}

export default TasksTabs;
