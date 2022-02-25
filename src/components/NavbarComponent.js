import React from "react"
import { Container, Nav } from "react-bootstrap"
import SearchFormComponent from "./SearchFormComponent"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  return (
    <Nav className="navbar navbar-light bg-light">
      <Container>
        <span class="navbar-brand">MSYNC</span>
        <Link to="/">Home</Link>
        <Link to="#">Saved Artists</Link>
        <Link to="#">Saved Tracks</Link>
        <SearchFormComponent />
      </Container>
    </Nav>
  )
}
