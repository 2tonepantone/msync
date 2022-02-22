import React from "react"
import { Form, Button } from "react-bootstrap"

const SearchFormComponent = () => {
  return (
    <Form>
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
            placeholder="Enter an artist or track name"
            name="query"
          />
          <label htmlFor="floatingSearchInput">Enter an artist or track name</label>
          <Button variant="outline-primary" type="submit">Search</Button>
        </Form.Floating>
        <Form.Text className="text-muted">
          Don't worry about spelling mistakes. We'll do our best to guess your intent.
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

export default SearchFormComponent
