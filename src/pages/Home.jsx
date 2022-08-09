import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getProductsThunk,
  filterQueryThunk,
  filterCategoryThunk,
 
} from "../store/slices/products.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Card, Col, InputGroup, Form, Button,ListGroup} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [searchProduct, setSearchPorduct] = useState("");
  const [category, setCategory] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategory(res.data.data.categories));
  }, []);

  return (
    <div>

        <Row>
         <Col lg={3}>

         <ListGroup>
        {
            category.map(categorie=>(
                <ListGroup.Item onClick={()=>dispatch(filterCategoryThunk(categorie.id))}>
                    {categorie.name}
                </ListGroup.Item>

            ))
        }
       
      </ListGroup>
         
         </Col>

         <Col>
         <h1>Home</h1>

     

<InputGroup className="mb-3">
  <Form.Control
    placeholder="Recipient's username"
    aria-label="Recipient's username"
    aria-describedby="basic-addon2"
    onChange={(e) => setSearchPorduct(e.target.value)}
    value={searchProduct}
  />
  <Button
    variant="outline-secondary"
    onClick={() => dispatch(filterQueryThunk(searchProduct))}
  >
    Button
  </Button>
</InputGroup>
<Row xs={1} md={2} xl={3} className="g-4">
  {products.map((product) => (
    <Col>
      <Card onClick={() => navigate(`/detail/${product.id}`)}>
        <Card.Img variant="top" src={product.productImgs[0]} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
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
         
         </Col>

        </Row>
     
    </div>
  );
};

export default Home;
