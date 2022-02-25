import React from "react"
import { Container, Nav } from "react-bootstrap"
import SearchFormComponent from "./SearchFormComponent"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  const handleClick = () => {
    const input = document.getElementById('artistSearchInput')
    console.log("Input:", input.value)
    input.value = ''
    console.log("Input:", input.value)
  }

  return (
    <Nav className="navbar navbar-light bg-light">
      <Container>
        <span className="navbar-brand">MSYNC</span>
        <Link to="/" onClick={handleClick}>Home</Link>
        <Link to="#">Saved Artists</Link>
        <Link to="#">Saved Tracks</Link>
        <SearchFormComponent />
      </Container>
    </Nav>
  )
}
