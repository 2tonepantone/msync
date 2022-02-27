import React from "react"
import { Accordion, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom"
import DeleteButton from "./DeleteButton"

const TrackListCard = ({ listTitle, trackList }) => {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          {listTitle}
          <DeleteButton target={listTitle} targetType="list" listType="tracks" />
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {trackList.items.length} item(s) in list
        </Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        {trackList.items.map((track, i) => (
          <Accordion>
            <Accordion.Item eventKey={track.name}>
              <Accordion.Header><strong>{i + 1}. {track.name}</strong></Accordion.Header>
              <Accordion.Body className="p-0">
                <ListGroupItem>Artist: {track.artist.name}</ListGroupItem>
                <ListGroupItem>Album: {track.album.title}</ListGroupItem>
                <ListGroupItem>Play count: {parseInt(track.playcount).toLocaleString()}</ListGroupItem>
                <ListGroupItem>Listeners: {parseInt(track.listeners).toLocaleString()}</ListGroupItem>
                <ListGroupItem>Tags: {(track.toptags.tag).map(tag => tag.name).join(', ')}</ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <Link to={`/track/${track.artist.name}/${track.name}`}>More info</Link>
                  <DeleteButton target={track.name} targetType="track" listType="tracks" />
                </ListGroupItem>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </ListGroup>
    </Card>
  )
}

export default TrackListCard
