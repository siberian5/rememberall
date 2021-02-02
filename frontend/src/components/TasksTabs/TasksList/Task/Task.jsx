import React from "react";
import PropTypes from "prop-types";
import { Accordion, Card } from "react-bootstrap";
import "./Task.css";

const ActiveTask = ({
  id, title, description, isActive,
}) => (
  <div className="task-item">
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={id}>
        {title}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>
          {description}
          {isActive && <p>Я актуальна</p> }
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
);

ActiveTask.propTypes = {
  id: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node,
  isActive: PropTypes.node,
};
ActiveTask.defaultProps = {
  id: "",
  title: "",
  description: "",
  isActive: false,
};

export default ActiveTask;
