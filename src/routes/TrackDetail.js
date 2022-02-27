import React, { useState, useEffect } from "react"
import {
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Button,
  Col
} from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import SaveTrackButton from "../components/SaveTrackButton"
import SimilarTrackCard from "../components/SimilarTrackCard"
import './ArtistDetail.css'

const TrackDetail = () => {
  const key = process.env.REACT_APP_KEY
  const { artist, trackName } = useParams()
  const tracksData = useSelector(state => state.tracks)
  const { name, listeners, playcount, album, toptags, wiki } = tracksData[trackName]
  const [expanded, setExpanded] = useState(false)
  const [similarTracks, setSimilarTracks] = useState()

  useEffect(() => {
    const url = `http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(trackName)}&limit=12&api_key=${key}&format=json`
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setSimilarTracks(result.similartracks.track)
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }, [artist, trackName])

  const capitalize = (string) => (string.charAt(0).toUpperCase() + string.slice(1))

  return (
    <Container className="mb-5 mt-4">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            {name} <SaveTrackButton trackName={name} />
          </Card.Title>
          {wiki.content &&
            <>
              <Card.Text className={`bio mb-1 ${expanded ? "expanded" : ""}`}>
                {(wiki.content).match(/[^<]+/)}
              </Card.Text>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show Less" : "Read more"}
              </Button>
            </>
          }
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroupItem>Artist: {artist}</ListGroupItem>
          <ListGroupItem>Album: {album.title}</ListGroupItem>
          <ListGroupItem>Play count: {parseInt(playcount).toLocaleString()}</ListGroupItem>
          <ListGroupItem>Listeners: {parseInt(listeners).toLocaleString()}</ListGroupItem>
          <ListGroupItem>Tags: {toptags.tag.map(tag => tag.name).join(', ')}</ListGroupItem>
        </ListGroup>
      </Card>
      <Row className="mt-4">
        {similarTracks && <h5>Similar Tracks:</h5>}
        {similarTracks && similarTracks.slice(0,6).map(track => (
          <Col className="g-4">
            <SimilarTrackCard
              trackData={track}
              match={parseInt(track.match * 100)}
              queriedTrack={capitalize(trackName)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default TrackDetail
