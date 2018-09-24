import React from 'react';
import { Alert, Button, Card, CardTitle, CardText, Col, Container, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import Logo from '../logo.svg';

const StudentView = () => (
  <div className="App">
    <header className="App-header">
      <img src={Logo} className="App-logo" alt="Logo" />
      <h1 className="App-title">Welcome to the Graasp App Starter Kit</h1>
    </header>
    <Container className="App-body">
      <Alert color="info">
        This is the student view. Switch to the teacher view by clicking on the URL below.
        <a href="?mode=teacher">
          <pre>{`${window.location.host}/?mode=teacher`}</pre>
        </a>
      </Alert>

      <Card body>
        <Row className="px-5">
          <Col md="6" className="right-border">
            <CardTitle>
              <span>Triangle A dimensions here</span>
            </CardTitle>
            <div className="clearfix">
              <span className="float-left"><input type="radio" name="triangleAsize" checked/> Use Sizes</span>
              <span className="float-right"><input type="radio" name="triangleAsize"/> Use Angles</span>
            </div>
            <CardText className="py-3">
              <Form>
                <FormGroup row>
                  <Label sm={2}>Side A</Label>
                  <Col sm={10}>
                    <Input type="number" min="0" placeholder="Side A size" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Side B</Label>
                  <Col sm={10}>
                    <Input type="number" min="0" placeholder="Side B size" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Side C</Label>
                  <Col sm={10}>
                    <Input type="number" min="0" placeholder="Side C size" />
                  </Col>
                </FormGroup>
              </Form>
            </CardText>
          </Col>
          <Col md="6">
            <h5>Triangle Preview</h5>
            <p>Renders content goes here.</p>
          </Col>
        </Row>

        <Row className="px-5">
          <Col md="6" className="pt-4 right-border top-border">
            <h5>Triangle B dimensions here</h5>
            <div className="clearfix">
              <span className="float-left"><input type="radio" name="triangleBsize" checked/> Use Sizes</span>
              <span className="float-right"><input type="radio" name="triangleBsize"/> Use Angles</span>
            </div>
            <CardText className="py-3">
              <div>
                <Form>
                  <FormGroup row>
                    <Label sm={2}>Side A</Label>
                    <Col sm={10}>
                      <Input type="number" min="0" placeholder="Side A size" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Side B</Label>
                    <Col sm={10}>
                      <Input type="number" min="0" placeholder="Side B size" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Side C</Label>
                    <Col sm={10}>
                      <Input type="number" min="0" placeholder="Side C size" />
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </CardText>
          </Col>
          <Col md="6" className="pt-5 top-border">
            <div>
              <h5>Triangle Preview</h5>
              <p>Renders content goes here.</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Row className="pt-5">
        <div className="ml-auto">
          <Button color="primary mr-3">Reset</Button>
          <Button color="outline-secondary">Simulate</Button>
        </div>
      </Row>
    </Container>
  </div>
);

export default StudentView;
