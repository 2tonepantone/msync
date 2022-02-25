import React from "react"
import ArtistListCard from "../components/ArtistListCard"
import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"

const ArtistLists = () => {
  const {items} = useSelector(state => state.lists)

  function flatten(obj) {
    return Object.values(obj).flat()
  }

  const artistsData = flatten(items)

  return (
    <Container className="mb-5">
      <Row>
        <Col className="g-4">
          <ArtistListCard artistsData={artistsData} />
        </Col>
      </Row>
    </Container>
  )
}

export default ArtistLists
