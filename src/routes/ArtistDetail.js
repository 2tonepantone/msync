import React, { useState, useEffect } from "react"
import {
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Accordion,
  Button
} from "react-bootstrap"
import { useParams } from "react-router-dom"
import SaveButton from "../components/SaveButton"
import SimilarArtistCard from "../components/SimilarArtistCard"
import { useDispatch } from "react-redux"
import { addArtist } from "../features/artists/artistsSlice"
import './ArtistDetail.css'

const ArtistDetail = () => {
  const key = process.env.REACT_APP_KEY
  const { artist } = useParams()
  const [topTracks, setTopTracks] = useState()
  const [topAlbums, setTopAlbums] = useState()
  const [name, setName] = useState()
  const [bio, setBio] = useState()
  const [ontour, setOntour] = useState()
  const [similarArtists, setSimilarArtists] = useState()
  const [tags, setTags] = useState()
  const [listeners, setListeners] = useState()
  const [playCount, setPlayCount] = useState()
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const query = `artist=${encodeURIComponent(artist)}`
    fetch(`http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getinfo&${query}&api_key=${key}`)
      .then(res => res.json())
      .then(
        (result) => {
          setName(result.artist.name)
          setBio(result.artist.bio.content)
          setOntour(result.artist.ontour)
          setSimilarArtists(result.artist.similar.artist)
          setListeners(parseInt(result.artist.stats.listeners).toLocaleString())
          setPlayCount(parseInt(result.artist.stats.playcount).toLocaleString())
          setTags(result.artist.tags.tag.map(tag => tag.name).join(', '))
          dispatch(addArtist({ [result.artist.name]: result.artist }))
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }, [artist])

  useEffect(() => {
    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artist)}&api_key=${key}&format=json&limit=10`)
      .then(res => res.json())
      .then(
        (result) => {
          setTopTracks(result.toptracks.track)
        },
        (error) => {
          console.log("Oops!", error)
        }
      )

    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(artist)}&api_key=${key}&format=json`)
      .then(res => res.json())
      .then(
        (result) => {
          setTopAlbums(result.topalbums.album)
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }, [artist])

  return (
    <Container className="mb-5 mt-4">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            {name} <SaveButton artistName={name} />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {ontour === '1' ? "Currently" : "Not"} touring
          </Card.Subtitle>
          {bio &&
            <>
              <Card.Text className={`bio mb-1 ${expanded ? "expanded" : ""}`}>
                {bio.match(/[^<]+/)}
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
          <Accordion>
            <Accordion.Item eventKey={name}>
              <Accordion.Header>Top Tracks:</Accordion.Header>
              <Accordion.Body className="p-0">
              {topTracks && topTracks.map((track, i) => (
                <>
                  <Card.Header>{`${i+1}. ${track.name}`}</Card.Header>
                  <ListGroupItem>
                    <strong>Plays:</strong> {parseInt(track.playcount).toLocaleString()} <strong>Listeners:</strong> {parseInt(track.listeners).toLocaleString()}
                  </ListGroupItem>
                </>
              ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item eventKey={name}>
              <Accordion.Header>Top Albums:</Accordion.Header>
              <Accordion.Body className="p-0">
              {topAlbums && topAlbums.slice(0,10).map((album, i) => (
                <>
                  <Card.Header>{`${i+1}. ${album.name}`}</Card.Header>
                  <ListGroupItem>
                    <strong>Plays:</strong> {parseInt(album.playcount).toLocaleString()}
                  </ListGroupItem>
                </>
              ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <ListGroupItem>Listeners: {parseInt(listeners).toLocaleString()}</ListGroupItem>
          <ListGroupItem>Play count: {parseInt(playCount).toLocaleString()}</ListGroupItem>
          <ListGroupItem>Tags: {tags}</ListGroupItem>
        </ListGroup>
      </Card>
      <Row className="mt-4">
        {similarArtists && <h5>Similar Artists:</h5>}
        {similarArtists && similarArtists.slice(0,3).map(artist => (
            <Col className="g-4">
              <SimilarArtistCard
                name={artist.name}
                queriedArtist={name}
                key={artist.mbid}
                mbid={artist.mbid}
              />
            </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ArtistDetail
