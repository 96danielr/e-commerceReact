import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import { Card, Row, Col, Button } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { addProductThunk } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const products = useSelector((state) => state.products);
  const [productDetail, setProductDetail] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const product = products.find(
      (productItem) => productItem.id === Number(id)
    );
    setProductDetail(product);

    const filteredproducts = products.filter(
      (productItem) => productItem.category.id === product.category.id
    );
    setSimilarProduct(filteredproducts);
  }, [products, id]);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);
  const addToCart = () => {
    const product = {
      id: productDetail.id,
      quantity,
    };

    dispatch(addProductThunk(product));
    console.log(product);
  };
  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Card.Img variant="top" src={productDetail?.productImgs?.[0]} />
        <Card.Body>
          <Card.Title>{productDetail?.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div>
            <h3>Add product to cart</h3>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="units"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button
                variant="secondary"
                id="button-addon2"
                onClick={addToCart}
              >
                Add
              </Button>
            </InputGroup>
          </div>
        </Card.Body>
      </Card>

      <h1 style={{ fontSize: "15px", marginTop: "10px" }}>
        Discover similar products
      </h1>

      <Row
        xs={1}
        md={3}
        xl={5}
        className="g-4"
        style={{ marginTop: "10px", width: "100%" }}
      >
        {similarProduct.map((products) => (
          <Col>
            <Card
              onClick={() => navigate(`/detail/${products.id}`)}
              style={{ width: "12rem" }}
            >
              <Card.Img variant="top" src={products.productImgs?.[0]} />
              <Card.Body>
                <Card.Title>{products.title}</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductDetail;
<h1>ProductDetail</h1>;
