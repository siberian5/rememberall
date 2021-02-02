import React from "react";
import "./App.css";
import { Tab, Tabs } from "react-bootstrap";
import ActiveTasks from "./components/ActiveTasks/ActiveTasks";
import InactiveTasks from "./components/InactiveTasks/InactiveTasks";

const App = () => (
  <div className="App">
    <Tabs defaultActiveKey="activetasks" id="uncontrolled-tab-example">
      <Tab eventKey="activetasks" title="Актуальные задачи">
        <ActiveTasks />
      </Tab>
      <Tab eventKey="inactivetasks" title="Завершенные задачи">
        <InactiveTasks />
      </Tab>
    </Tabs>
  </div>
);

export default App;
