import React from "react";
import PropTypes from "prop-types";
import { Accordion, Card } from "react-bootstrap";

const ActiveTask = ({ id, title, description }) => (
  <div className="task-item">
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={id}>
        {title}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>
          {description}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
);

ActiveTask.propTypes = {
  id: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node,
};
ActiveTask.defaultProps = {
  id: "",
  title: "",
  description: "",
};

export default ActiveTask;
