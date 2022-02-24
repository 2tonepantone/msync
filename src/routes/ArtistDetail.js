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
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import SimilarArtistCard from "../components/SimilarArtistCard"
import './ArtistDetail.css'

const ArtistDetail = () => {
  const key = process.env.REACT_APP_KEY
  const { artist } = useParams()
  const artistsData = useSelector(state => state.artists)
  const [topTracks, setTopTracks] = useState()
  const [topAlbums, setTopAlbums] = useState()
  // console.log(`From detail ${Object.keys(artistsData).length}`, artistsData)
  const { name, bio, ontour, similar, stats, tags } = artistsData[artist]
  const [expanded, setExpanded] = useState(false)
  console.log('Artist detail artists', artist)

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
  }, [artist, key])

  return (
    <Container className="m-5">
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {ontour === '1' ? "Currently" : "Not"} touring
          </Card.Subtitle>
          {bio.content &&
            <>
              <Card.Text className={`bio mb-1 ${expanded ? "expanded" : ""}`}>
                {(bio.content).match(/[^<]+/)}
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
                    Plays: {parseInt(track.playcount).toLocaleString()}, Listeners: {parseInt(track.listeners).toLocaleString()}
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
                {console.log("Photos", topAlbums)}
              {topAlbums && topAlbums.slice(0,10).map((album, i) => (
                <>
                  <Card.Header>{`${i+1}. ${album.name}`}</Card.Header>
                  <ListGroupItem>
                    Plays: {parseInt(album.playcount).toLocaleString()}
                  </ListGroupItem>
                </>
              ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <ListGroupItem>Listeners: {parseInt(stats.listeners).toLocaleString()}</ListGroupItem>
          <ListGroupItem>Play count: {parseInt(stats.playcount).toLocaleString()}</ListGroupItem>
          <ListGroupItem>Tags: {(tags.tag).map(tag => tag.name).join(', ')}</ListGroupItem>
        </ListGroup>
      </Card>
      <Row className="mt-5">
        {similar.artist && <h5>Similar Artists:</h5>}
        {similar.artist && similar.artist.slice(0,3).map(artist => (
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
