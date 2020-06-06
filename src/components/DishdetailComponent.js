import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderDish({ dish }) {
  return (
    <div>
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  const commentDetail = comments.map(cmnt => {
    return (
      <li key={cmnt.id}>
        <p>{cmnt.comment}</p>
        <p>
          -- {cmnt.author},
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit"
          }).format(new Date(Date.parse(cmnt.date)))}
        </p>
      </li>
    );
  });

  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">{commentDetail}</ul>
    </div>
  );
}

const DishDetail = props => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
            <CommentForm />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button outline color="secondary" onClick={this.toggle}>
          Submit Comment
        </Button>{" "}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="firstname" md={2}>
                  Rating
                </Label>
                <Col md={12}>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    value=""
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="lastname" md={4}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Your Name"
                    value=""
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="message" md={4}>
                  Comment
                </Label>
                <Col md={12}>
                  <Input
                    type="textarea"
                    id="message"
                    name="message"
                    rows="6"
                    value=""
                  ></Input>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className="flex-lg-row-reverse">
            <Button color="primary" onClick={this.toggle}>
              Submit
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DishDetail;
