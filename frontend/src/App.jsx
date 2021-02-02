import React from "react";
import "./App.css";
import TasksTabs from "./components/TasksTabs/TasksTabs";
import Header from "./components/Header/Header";

const App = () => (
  <div className="App">
    <Header />
    <TasksTabs />
  </div>
);

export default App;
