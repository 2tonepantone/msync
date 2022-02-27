import React from "react"
import { Accordion, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteItem } from "../features/artists/listsSlice"

const ArtistListCard = ({ listTitle, artistList }) => {
  const dispatch = useDispatch()

  const handleDelete = (artist) => {
    dispatch(deleteItem(artist))
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{listTitle}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {artistList.items.length} item(s) in list
        </Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        {artistList.items.map((artist, i) => (
          <Accordion>
            <Accordion.Item eventKey={artist.name}>
              <Accordion.Header><strong>{i + 1}. {artist.name}</strong></Accordion.Header>
              <Accordion.Body className="p-0">
                <ListGroupItem>Play count: {parseInt(artist.stats.playcount).toLocaleString()}</ListGroupItem>
                <ListGroupItem>Listeners: {parseInt(artist.stats.listeners).toLocaleString()}</ListGroupItem>
                <ListGroupItem>Tags: {(artist.tags.tag).map(tag => tag.name).join(', ')}</ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <Link to={`/artist/${artist.name}`}>More info</Link>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(artist.name)}
                  >
                    Delete
                  </Button>
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
