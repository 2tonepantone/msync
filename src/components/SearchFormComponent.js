import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"

const SearchFormComponent = () => {
  const [apiParams, setApiParams] = useState({similar: false, artist: "", track: "", tag: ""})
  const key = process.env.REACT_APP_KEY

  const handleChange = (event) => {
    const { name, value } = event.target
    setApiParams(prevApiParams => ({
      ...prevApiParams,
      [name]: value
    }))
  }

  console.log(apiParams)
  const handleClick = () => {
    const { similar_tracks, artist, track, tag } = apiParams
    const [encodedArtist, encodedTrack, encodedTag] = [ artist, track, tag ].map(str => encodeURIComponent(str))
    console.log("Encoded", encodedArtist, encodedTrack, encodedTag)
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodedArtist}&limit=10&api_key=${key}&format=json`
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group>
        <Form.Check
          inline
          defaultChecked
          label="Similar Artists"
          name="similar"
          value="artists"
          type="radio"
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="Similar Tracks"
          name="similar"
          value="tracks"
          type="radio"
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="Similar Tags"
          name="similar"
          value="tags"
          type="radio"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Floating className="d-flex">
          <Form.Control
            required
            id="floatingSearchInput"
            type="text"
            placeholder="Enter an artist or track name"
            name="artist"
            onChange={handleChange}
            />
          <label htmlFor="floatingSearchInput">Enter an artist or track name</label>
          <Button
            variant="outline-primary"
            type="submit"
            onClick={handleClick}
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