import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import SimilarArtistCard from "./SimilarArtistCard"

const SimilarArtists = () => {
  const key = process.env.REACT_APP_KEY
  const [similarArtists, setSimilarArtists] = useState()
  const [queriedArtist, setQueriedArtists] = useState()

  useEffect(() => {
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodedArtist}&limit=12&api_key=${key}&format=json`
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setSimilarArtists(result.similarartists.artist)
          setQueriedArtists(result.similarartists['@attr'].artist)
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  })

  return (
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
  )
}

export default SimilarArtists
