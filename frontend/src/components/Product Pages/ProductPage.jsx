import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import NavBar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";



const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { productId } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/v1/products/${productId}`
        );
        console.log(response);
        setProduct(response.data.product);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const options = {
    edit: true,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const items = product.images.map((image) => ({
    src: image.url,
    altText: product.name,
    caption: product.name,
  }));

  return (
    <Fragment>
      <NavBar white={true} />
      <div />
      <Container style={{ "margin-top": "10%","margin-bottom": "10%"  }}>
        <Row className="justify-content-center">
          <Col md="4">
            <Card>
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators
                  items={items}
                  activeIndex={activeIndex}
                  onClickHandler={goToIndex}
                />
                {items.map((item) => (
                  <CarouselItem
                    onExiting={onExiting}
                    onExited={onExited}
                    key={item.src}
                  >
                    <img src={item.src} alt={item.altText} />
                    <CarouselCaption
                      captionText={item.caption}
                      captionHeader=""
                    />
                  </CarouselItem>
                ))}
                <a
                  className="left carousel-control carousel-control-prev"
                  data-slide="prev"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    previous();
                  }}
                  role="button"
                >
                  <span className="fa fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="right carousel-control carousel-control-next"
                  data-slide="next"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    next();
                  }}
                  role="button"
                >
                  <span className="fa fa-angle-right" />
                  <span className="sr-only">Next</span>
                </a>
              </Carousel>
            </Card>
          </Col>
          <Col
            md="6"
            className="d-flex justify-content-center align-items-center"
          >
            <div>
              <h2 className="d-flex justify-content-center ">{product.name}</h2>
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-block" }}>
                  <ReactStars {...options} />
                </div>
              </div>
              <p className="d-flex justify-content-center">
                {product.description}
              </p>
              <p className="d-flex justify-content-center">₹{product.price}</p>
              <p className="d-flex justify-content-center">
                Stock:{product.stock}
              </p>
              <p className="d-flex justify-content-center">
                Category:{product.category}
              </p>
              <p className="d-flex justify-content-center">
                Number of Reviews: {product.numberOfReviews}
              </p>
              {/* Render other product details */}
              <Button
                block
                className="btn-round"
                color="danger"
                style={{ "margin-top": "20%" }}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Fragment>
  );
};

export default ProductDetail;
