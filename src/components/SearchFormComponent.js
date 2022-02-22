import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

const SearchFormComponent = () => {
  const [apiParams, setApiParams] = useState({similar: "", artist: "", track: ""})

  const handleChange = (event) => {
    const { name, value } = event.target
    setApiParams(prevApiParams => ({
      ...prevApiParams,
      [name]: value
    }))
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
      </Form.Group>
      <Form.Group>
        <Form.Floating className="d-flex">
          <Form.Control
            required
            id="floatingSearchInput"
            type="text"
            placeholder="Enter an artist name"
            name="artist"
            onChange={handleChange}
            />
          <label htmlFor="floatingSearchInput">Enter an artist's name</label>
          <Link to={`/${apiParams.artist}`}>
            <Button
              variant="outline-primary"
              type="submit"
            >
              Search
            </Button>
          </Link>
        </Form.Floating>
        <Form.Text className="text-muted">
          Don't worry about spelling mistakes. We'll do our best to guess your intent.
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

export default SearchFormComponent
