import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { connect } from "react-redux"
import TrackListCard from "../components/TrackListCard"

const TrackLists = ({ trackLists }) => {
  const mergedLists = trackLists.reduce((acc, { listTitle, items }) => {
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
            <TrackListCard listTitle={key} trackList={value} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

function mapStateToProps(state) {
  return { trackLists: state.trackLists };
}

export default connect(mapStateToProps)(TrackLists)
