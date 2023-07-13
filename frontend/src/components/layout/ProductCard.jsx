import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

function ProductCard({ product }) {
  const options = {
    edit: true,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
    <Col
      md="3"
      className="hover-box"
      style={{
        margin: "2%",
      }}
    >
      <Link to={`/products/${product._id}`} className="hover-box" style={{ textDecoration: "none",}}>
      <Card className="card-profile card-plain">
      <div >
        <div className="info" >
          <div className="icon icon-info">
            <img
              className="nc-icon nc-album-2"
              src={product.images[0].url}
              alt={product.name}
            />
          </div>
          <div className="description">
            <h4 className="info-title">{product.name}</h4>
            <p className="description">{product.description}</p>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block" }}>
                <ReactStars {...options} />
              </div>
              <div style={{ marginTop: "1%" }}>
                <span>{product.numberOfReviews} Reviews</span>
              </div>
            </div>

            <Button
              style={{ textDecoration: "none" }}
              className="btn-link"
              color="info"
              href="#pablo"
            >
              See more
            </Button>
          </div>
        </div>
        </div>
        </Card>
      </Link>
    </Col>
    </Fragment>
  );
}

export default ProductCard;
