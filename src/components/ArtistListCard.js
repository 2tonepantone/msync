import React from "react"
import { Accordion, Card, ListGroup, ListGroupItem } from "react-bootstrap"

const ArtistListCard = ({artistsData}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Favorite Artists</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {artistsData.length} item(s) in list
        </Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        {artistsData && artistsData.map((artist, i) => (
          <Accordion>
            <Accordion.Item eventKey={artist.name}>
              <Accordion.Header><strong>{i + 1}. {artist.name}</strong></Accordion.Header>
              <Accordion.Body className="p-0">
                <ListGroupItem>Play count: {parseInt(artist.stats.playcount).toLocaleString()}</ListGroupItem>
                <ListGroupItem>Listeners: {parseInt(artist.stats.listeners).toLocaleString()}</ListGroupItem>
                <ListGroupItem>Tags: {(artist.tags.tag).map(tag => tag.name).join(', ')}</ListGroupItem>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </ListGroup>
    </Card>
  )
}

export default ArtistListCard
