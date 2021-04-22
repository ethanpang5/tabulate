import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import {signIn, signOut } from "../scripts/login.js";
import { UserContext } from "../providers/UserProvider";

export const NavbarComponent = (props) => {
    const user = useContext(UserContext)
    console.log(user)

    const handleSignOut = async () => {
        await signOut()
        window.location.reload()
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Tabulate</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/">dashboard</Link></Nav.Link>
                    <Nav.Link><Link to="/analytics">analytics</Link></Nav.Link>
                    <Nav.Link><Link to="/settings">settings</Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {user ? <Button onClick={handleSignOut}>Sign out</Button> : <Button onClick={signIn}>Sign in</Button>}
        </Navbar>
    )
}