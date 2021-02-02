import React from "react";
import { Accordion } from "react-bootstrap";
import InactiveTask from "./InactiveTask/InactiveTask";

const InactiveTasksList = () => (
  <div className="tasks-list">
    <Accordion defaultActiveKey="0">
      <InactiveTask id="1" title="Задача 1" description="Описание 1" />
      <InactiveTask id="2" title="Задача 2" description="Описание 2" />
    </Accordion>
  </div>
);

export default InactiveTasksList;
