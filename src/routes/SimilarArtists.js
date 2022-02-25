import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Row, Col, Container } from "react-bootstrap"
import SimilarArtistCard from "../components/SimilarArtistCard"

const SimilarArtists = () => {
  const key = process.env.REACT_APP_KEY
  const { artist } = useParams()
  const [similarArtists, setSimilarArtists] = useState()
  const [queriedArtist, setQueriedArtist] = useState()

  useEffect(() => {
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(artist)}&limit=12&api_key=${key}&format=json`
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setSimilarArtists(result.similarartists.artist)
          setQueriedArtist(result.similarartists['@attr'].artist)
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }, [artist, key])

  return (
    <Container className="mb-5">
      <Row>
        {similarArtists && similarArtists.map(artist => (
          <Col className="g-4">
            <SimilarArtistCard
              name={artist.name}
              match={parseInt(artist.match * 100)}
              queriedArtist={queriedArtist}
              key={artist.mbid}
              mbid={artist.mbid}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default SimilarArtists
