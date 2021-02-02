import React from "react";
import { Accordion } from "react-bootstrap";
import ActiveTask from "./ActiveTask/ActiveTask";

const ActiveTasksList = () => (
  <div className="tasks-list">
    <Accordion defaultActiveKey="0">
      <ActiveTask id="1" title="Задача 1" description="Описание 1" />
      <ActiveTask id="2" title="Задача 2" description="Описание 2" />
    </Accordion>
  </div>
);

export default ActiveTasksList;
