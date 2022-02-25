import React from "react"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"

const ArtistListCard = () => {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>List Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Subtitle
        </Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroupItem>Song</ListGroupItem>
        <ListGroupItem>Song</ListGroupItem>
        <ListGroupItem>Song</ListGroupItem>
        <ListGroupItem>Song</ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default ArtistListCard
