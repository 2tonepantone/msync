import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

const SearchFormComponent = () => {
  const [artistQuery, setArtistQuery] = useState()
  const [similarTracks, setSimilarTracks] = useState(false)
  const [trackQuery, setTrackQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (artistQuery) {
      var timeOutId = setTimeout(() => navigate(`artists/${artistQuery}`), 500)
    }

    return () => clearTimeout(timeOutId)
  }, [artistQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`artists/${artistQuery}`)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Check
          inline
          defaultChecked
          label="Similar Artists"
          name="similar"
          value="artists"
          type="radio"
        />
        <Form.Check
          inline
          label="Similar Tracks"
          name="similar"
          value="tracks"
          type="radio"
        />
      </Form.Group>
      <Form.Group>
        <Form.Floating className="d-flex">
          <Form.Control
            required
            id="artistSearchInput"
            type="text"
            placeholder="Enter an artist name"
            name="artist"
            value={useParams().artist}
            onChange={e => setArtistQuery(e.target.value)}
            />
          <label htmlFor="artistSearchInput">Enter an artist's name</label>
          <Button
            variant="outline-primary"
            type="submit"
          >
            Search
          </Button>
        </Form.Floating>
        <Form.Text className="text-muted">
          Don't worry about spelling mistakes. We'll do our best to guess your intent.
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

export default SearchFormComponent
