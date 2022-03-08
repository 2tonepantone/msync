import React from "react"
import ArtistListCard from "../components/ArtistListCard"
import { Col, Container, Row } from "react-bootstrap"
import { connect } from "react-redux"
import IndexComponent from "./IndexComponent"

const ArtistLists = ({ lists }) => {
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
      {!Object.entries(mergedLists).length && <IndexComponent pageType="artists" />}
      <Row>
        {Object.entries(mergedLists).map(([key, value]) => (
          <Col className="g-4">
            <ArtistListCard listTitle={key} artistList={value} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

function mapStateToProps(state) {
  return { lists: state.lists };
}

export default connect(mapStateToProps)(ArtistLists)
