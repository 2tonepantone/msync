import React from "react";
import { Form, Button } from "react-bootstrap"

const SearchFormComponent = () => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Check
          inline
          defaultChecked
          label="Similar Artists"
          name="group1"
          type="radio"
          id="radio-artists"
        />
        <Form.Check
          inline
          label="Similar Tracks"
          name="group1"
          type="radio"
          id="radio-tracks"
        />
        <Form.Floating className="d-flex">
          <Form.Control
            required
            id="floatingSearchInput"
            type="text"
            placeholder="Enter an artist or track name"
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

export default SearchFormComponent;
