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
import { useParams } from "react-router-dom"
import SaveTrackButton from "../components/SaveTrackButton"
import SimilarTrackCard from "../components/SimilarTrackCard"
import { useDispatch } from "react-redux"
import { addTrack } from "../features/tracks/tracksSlice"
import './ArtistDetail.css'

const TrackDetail = () => {
  const key = process.env.REACT_APP_KEY
  const { artist, trackName } = useParams()
  const [expanded, setExpanded] = useState(false)
  const [similarTracks, setSimilarTracks] = useState()
  const [name, setName] = useState()
  const [listeners, setListeners] = useState()
  const [playCount, setPlayCount] = useState()
  const [album, setAlbum] = useState()
  const [tags, setTags] = useState()
  const [bio, setBio] = useState()
  const dispatch = useDispatch()
  const capitalize = (string) => (string.charAt(0).toUpperCase() + string.slice(1))

  useEffect(() => {
    const query = `artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(trackName)}`
    fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${key}&${query}&format=json`)
      .then(res => res.json())
      .then(
        (result) => {
          setName(result.track.name)
          setListeners(result.track.listeners)
          setBio(result.track.wiki.content)
          setAlbum(result.track.album.title)
          setTags(result.track.toptags.tag)
          setPlayCount(result.track.playcount)
          dispatch(addTrack({ [capitalize(trackName)]: result.track }))
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }, [artist, trackName])

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

  return (
    <Container className="mb-5 mt-4">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            {name} <SaveTrackButton trackName={name} />
          </Card.Title>
          {bio &&
            <>
              <Card.Text className={`bio mb-1 ${expanded ? "expanded" : ""}`}>
                {(bio).match(/[^<]+/)}
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
          <ListGroupItem>Album: {album}</ListGroupItem>
          <ListGroupItem>Play count: {parseInt(playCount).toLocaleString()}</ListGroupItem>
          <ListGroupItem>Listeners: {parseInt(listeners).toLocaleString()}</ListGroupItem>
          <ListGroupItem>Tags: {tags?.map(tag => tag.name).join(', ')}</ListGroupItem>
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
