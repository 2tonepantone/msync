import React, { useState, useEffect } from "react"
import { Card, ListGroup, ListGroupItem, Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"


const ArtistDetail = () => {
  const key = process.env.REACT_APP_KEY
  const { artist } = useParams()
  const artistsData = useSelector(state => state.artists)
  // console.log(`From detail ${Object.keys(artistsData).length}`, artistsData)
  const { name, bio, ontour, similar, stats, tags } = artistsData[artist]
  console.log("artist")
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {ontour === '1' ? "Currently" : "Not"} touring
          </Card.Subtitle>
          <Card.Text>
            {bio.content}
          </Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroupItem>Listeners: {parseInt(stats.listeners).toLocaleString()}</ListGroupItem>
          <ListGroupItem>Play count: {parseInt(stats.playcount).toLocaleString()}</ListGroupItem>
          <ListGroupItem>Tags: {(tags.tag).map(tag => tag.name).join(', ')}</ListGroupItem>
        </ListGroup>
      </Card>
    </Container>
  )
}

export default ArtistDetail
