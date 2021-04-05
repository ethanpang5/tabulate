import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavbarComponent = (props) => {

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Tabulate</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/">dashboard</Link></Nav.Link>
                    <Nav.Link><Link to="/analytics">analytics</Link></Nav.Link>
                    <Nav.Link><Link to="/settings">settings</Link></Nav.Link>
                    <Nav.Link><Link to="/">sign out</Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}