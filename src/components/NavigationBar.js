import { useContext } from "react";

import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/authContext'

export default function NavigationBar() {

  const { user, signInWithGoogle, signOutFromGoogle } = useContext(AuthContext)

  return (
    <>
      <Navbar bg="light" expand="sm" variant="light">
        <Container className="justify-content-between">
          <Navbar.Brand className="fw-bold fs-4" href="/">
            *LA CONSIGNE*
          </Navbar.Brand>

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
                  Designers
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