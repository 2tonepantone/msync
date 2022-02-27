import React from "react"
import { Container, Nav } from "react-bootstrap"
import SearchFormComponent from "./SearchFormComponent"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  const handleClick = () => document.getElementById('artistSearchInput').value = ''

  return (
    <Nav className="navbar navbar-light bg-light">
      <Container>
        <span className="navbar-brand">MSYNC</span>
        <Link to="/" onClick={handleClick}>Home</Link>
        <Link to="/lists/artists">Saved Artists</Link>
        <Link to="/lists/tracks">Saved Tracks</Link>
        <SearchFormComponent />
      </Container>
    </Nav>
  )
}
