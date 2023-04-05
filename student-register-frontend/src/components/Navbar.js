import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function Navbar1() {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Student Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Item href="/student">Student</NavDropdown.Item>
            <NavDropdown.Item href="/classroom">Classroom</NavDropdown.Item>
            <NavDropdown.Item href="/teacher">Teacher</NavDropdown.Item>
            <NavDropdown.Item href="subject">Subject</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/addsubjecttoteacher">Add Subject To Teacher</Nav.Link>
          <Nav.Link href="/addTeacherToClass">Add Teacher to Class</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
