import React from "react";
import { Jumbotron, Container } from 'reactstrap';

const About = () => (
  <div style={{ textAlign: 'center' }}>
  <Jumbotron fluid>
    <Container fluid>
      <h1 className="display-3">Welcome to my TodoApp</h1>
      <p className="lead">This is yet another boring todoapp.
      I also added user authentication and data storage.
      </p>
      <p  className="lead">
       My stack for this project: React (CRA v2) and Firebase
      </p>
    </Container>
  </Jumbotron>
</div>
  );

  export default About;