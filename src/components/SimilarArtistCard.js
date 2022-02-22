import React from "react"
import Card from "react-bootstrap/card"

const SimilarArtistCard = ({ queriedArtist, name, match }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {match}% similar to {queriedArtist}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

export default SimilarArtistCard
