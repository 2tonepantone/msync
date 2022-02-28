import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Row, Col, Container } from "react-bootstrap"
import SimilarTrackCard from "../components/SimilarTrackCard"

const SimilarTracks = () => {
  const key = process.env.REACT_APP_KEY
  const { artist, trackName } = useParams()
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
  }, [])

  const capitalize = (string) => (string.charAt(0).toUpperCase() + string.slice(1))

  return (
    <Container className="mb-5">
      <Row>
        {similarTracks && similarTracks.map(track => (
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

export default SimilarTracks
