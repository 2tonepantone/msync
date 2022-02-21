import React from "react";
import { Form, Button } from "react-bootstrap"
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const SearchFormComponent = () => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <div key={`inline-radio`}>
          <Form.Check
            inline
            label="Similar Artists"
            name="group1"
            type="radio"
            id={`inline-radio-artists`}
          />
          <Form.Check
            inline
            label="Similar Tracks"
            name="group1"
            type="radio"
            id={`inline-radio-tracks`}
          />
        </div>
        <FloatingLabel
          controlId="floatingInput"
          label="Enter an artist or track name"
        >
          <Form.Control required type="text" placeholder="Enter an artist or track name" />
        </FloatingLabel>
        <Form.Text className="text-muted">
          Don't worry about spelling mistakes. We'll do our best to guess your intent.
        </Form.Text>
      </Form.Group>
      <Button type="submit">Search</Button>
    </Form>
  )
}

export default SearchFormComponent;
