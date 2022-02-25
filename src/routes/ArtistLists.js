import React from "react"
import ArtistListCard from "../components/ArtistListCard"
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

const ArtistLists = () => {
  let artistLists = [0, 2, 2, 2, 2, 2]

  return (
    <Container className="mb-5">
      <Row>
        {artistLists && artistLists.map(list => (
          <Col className="g-4">
            <ArtistListCard />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ArtistLists
