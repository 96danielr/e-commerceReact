import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import CarSlideBar from "./CarSlideBar";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const logout = () => localStorage.setItem("token", "");

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    const token = localStorage.getItem("token")

    if(token !== ""){
    setShow(true)
       }

  
};


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">E-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/">Home</Nav.Link>

              <Nav.Link href="/#/purchases">Purchases</Nav.Link>

              {token ? (
                <Nav.Link
                  as={Button}
                  style={{
                    backgroundColor: " #f3969a",
                    borderBlockColor: " #f3969a",
                  }}
                  onClick={logout}
                >
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </Nav.Link>
              ) : (
                <Nav.Link href="/#/login"><i class="fa-solid fa-user"></i></Nav.Link>
              )}

                <Nav.Link
                  as={Button}
                  style={{
                    backgroundColor: " #f3969a",
                    borderBlockColor: " #f3969a",
                  }}
                  onClick={handleShow}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CarSlideBar show={show} handleClose={handleClose}/>
    </>
  );
};

export default NavBar;
