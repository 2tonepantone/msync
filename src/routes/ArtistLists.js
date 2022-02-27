import React from "react"
import ArtistListCard from "../components/ArtistListCard"
import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"

const ArtistLists = () => {
  const lists = useSelector(state => state.lists)
  const mergedLists = lists.reduce((acc, { listTitle, items }) => {
    acc[listTitle] ??= { items: [] };
    if (Array.isArray(items)) // if it's array type then concat
      acc[listTitle].items = acc[listTitle].items.concat(items);
    else
      acc[listTitle].items.push(items);

    return acc;
  }, {})

  return (
    <Container className="mb-5">
      <Row>
        {Object.entries(mergedLists).map(([key, value]) => (
          <Col className="g-4">
            <ArtistListCard listTitle={key} artistsData={value}/>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ArtistLists
