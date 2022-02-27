import React from "react"
import { Accordion, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom"

const ArtistListCard = ({listTitle, artistsData}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{listTitle}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {artistsData.items.length} item(s) in list
        </Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        {artistsData && artistsData.items.map((artist, i) => (
          <Accordion>
            <Accordion.Item eventKey={artist.name}>
              <Accordion.Header><strong>{i + 1}. {artist.name}</strong></Accordion.Header>
              <Accordion.Body className="p-0">
                <ListGroupItem>Play count: {parseInt(artist.stats.playcount).toLocaleString()}</ListGroupItem>
                <ListGroupItem>Listeners: {parseInt(artist.stats.listeners).toLocaleString()}</ListGroupItem>
                <ListGroupItem>Tags: {(artist.tags.tag).map(tag => tag.name).join(', ')}</ListGroupItem>
                <ListGroupItem>
                  <Link to={`/artist/${artist.name}`}>More info</Link>
                </ListGroupItem>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </ListGroup>
    </Card>
  )
}

export default ArtistListCard
