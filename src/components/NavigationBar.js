import { useState, useEffect } from "react";

import { Container, Navbar, Nav, Button, Form, FormControl} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavigationBar() {

  return (
    <>
      <Navbar bg="light" expand="sm" variant="light">
        <Container className="justify-content-between">
          <Navbar.Brand className="fw-bold fs-4" href="/">
            *LA CONSIGNE*
          </Navbar.Brand>
          <div className='text-center'>
            <Button href="/orders" variant="dark ms-2">Orders</Button>
            <Button href="/categories" variant="dark ms-2">Categories</Button>
            <Button href="/products" variant="dark ms-2">Products</Button>
            <Button href="/designers" variant="dark ms-2">Designers</Button>
          </div>
          <Button href="/login" variant="dark">Login</Button>
        </Container>
        
      </Navbar>
    </>
  );
}