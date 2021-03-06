import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"

const SearchFormComponent = () => {
  const [artistQuery, setArtistQuery] = useState()
  const [similarTracks, setSimilarTracks] = useState(false)
  const [trackQuery, setTrackQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (artistQuery && trackQuery && similarTracks) {
      var timeOutIdTracks = setTimeout(() => navigate(`tracks/${artistQuery}/${trackQuery}`), 500)
    } else if (artistQuery && !similarTracks) {
      var timeOutId = setTimeout(() => navigate(`artists/${artistQuery}`), 500)
    }

    return () => {
      clearTimeout(timeOutId)
      clearTimeout(timeOutIdTracks)
    }

  }, [artistQuery, trackQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (artistQuery && trackQuery && similarTracks) {
      navigate(`tracks/${artistQuery}/${trackQuery}`)
    } else if (artistQuery && !similarTracks) {
      navigate(`artists/${artistQuery}`)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Check
          inline
          defaultChecked
          label="Similar Artists"
          id="similarArtists"
          name="similar"
          value="artists"
          type="radio"
          onClick={() => setSimilarTracks(false)}
        />
        <Form.Check
          inline
          label="Similar Tracks"
          id="similarTracks"
          name="similar"
          value="tracks"
          type="radio"
          onClick={() => setSimilarTracks(true)}
        />
      </Form.Group>
      <Form.Group>
        <Row>
          <Col>
            <Form.Floating className="d-flex">
              <Form.Control
                required
                id="artistSearchInput"
                type="text"
                size="sm"
                name="artist"
                placeholder="Enter an artist"
                onChange={e => setArtistQuery(e.target.value)}
              />
              <label htmlFor="artistSearchInput">Enter an artist</label>
              {!similarTracks &&
                <Button
                  variant="outline-primary"
                  type="submit"
                >
                  Search
                </Button>
              }
            </Form.Floating>
          </Col>
        {similarTracks &&
          <Col>
            <Form.Floating className="d-flex">
              <Form.Control
                required
                id="trackSearchInput"
                type="text"
                size="sm"
                name="track"
                placeholder="Enter a track"
                onChange={e => setTrackQuery(e.target.value)}
              />
              <label htmlFor="trackSearchInput">Enter a track</label>
              <Button
                variant="outline-primary"
                type="submit"
              >
                Search
              </Button>
            </Form.Floating>
          </Col>
        }
        </Row>
        {/* <Form.Text className="text-muted">
          Don't worry about spelling mistakes. We'll do our best to guess your intent.
        </Form.Text> */}
      </Form.Group>
    </Form>
  )
}

export default SearchFormComponent
