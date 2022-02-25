import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

const SearchFormComponent = () => {
  const [similarTracks, setSimilarTracks] = useState(false)
  const [artistQuery, setArtistQuery] = useState("")
  const [trackQuery, setTrackQuery] = useState("")
  const didMountRef = useRef(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (didMountRef.current) {
  //     var timeOutId = setTimeout(() => navigate(`artists/${artistQuery}`), 500)
  //   }
  //   didMountRef.current = true

  //   return () => clearTimeout(timeOutId)
  // }, [artistQuery, navigate])

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
            id="floatingSearchInput"
            type="text"
            placeholder="Enter an artist name"
            name="artist"
            onChange={e => setArtistQuery(e.target.value)}
            />
          <label htmlFor="floatingSearchInput">Enter an artist's name</label>
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
