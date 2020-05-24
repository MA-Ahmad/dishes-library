import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
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
    <div className="col-12 col-md-4 m-1">
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
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.dish.comments} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default DishDetail;
