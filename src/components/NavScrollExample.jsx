import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const email = localStorage.getItem("email");
const username = localStorage.getItem("username");

function logoutHandler() {
  // Remove items from localStorage
  localStorage.removeItem("authToken");
  localStorage.removeItem("email");

  // Refresh the page
  window.location.reload();
}

function NavScrollExample() {
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="logotitle">
            <span >SiriBlogify</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* Use as={Link} to avoid nested <a> tags */}
            <Nav.Link as={Link} to="/register">
              <span>Register</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              <span>Login</span>
            </Nav.Link>
            <NavDropdown title="profile" id="navbarScrollingDropdown">
              {/* Use as={Link} for dropdown items as well */}
              <NavDropdown.Item as={Link} to="#action3">
                <span>{email}</span>
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/addblog">
                add Blog
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#action5">
                <span onClick={logoutHandler}>logout</span>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/addblog">
              <span>Add Blog</span>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
