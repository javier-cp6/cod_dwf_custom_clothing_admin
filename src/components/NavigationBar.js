import { useContext } from "react";

import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/authContext'

import main_logo from "../img/main_logo.jpg"

export default function NavigationBar() {

  const { user, signInWithGoogle, signOutFromGoogle } = useContext(AuthContext)

  return (
    <>
      <Navbar bg="light" expand="sm" variant="light">
        <Container className="justify-content-between">
          <div className="col-6 col-sm-6 col-md-auto col-lg-2">
            <Link className="div-img-logo d-flex" to="/">
              <img className="img-logo navbar-brand mx-0" src={main_logo} alt="la consigne logo"></img>
            </Link>
          </div>
          {/* <Navbar.Brand className="fw-bold fs-4" href="/">
            *LA CONSIGNE*
          </Navbar.Brand> */}

          {user ? (
            <div className="d-flex">
              <div className="text-center">
                <Button href="/orders" variant="dark ms-2">
                  Orders
                </Button>
                <Button href="/categories" variant="dark ms-2">
                  Categories
                </Button>
                <Button href="/products" variant="dark ms-2">
                  Products
                </Button>
                <Button href="/designers" variant="dark ms-2">
                  Creators
                </Button>
              </div>
              <Nav>
                  <NavDropdown
                    title={
                      <div className="d-inline">
                        <img
                          src={user.photoURL}
                          className="me-2"
                          style={{ borderRadius: "50%", width: "30px" }}
                          alt="user avatar"
                        />
                        <span>{user.displayName}</span>
                      </div>
                    }
                  >
                    <NavDropdown.Item onClick={signOutFromGoogle}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
              </Nav>
            </div>
          ) : null}
          
        </Container>
      </Navbar>
    </>
  );
}