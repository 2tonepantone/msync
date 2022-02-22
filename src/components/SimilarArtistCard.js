import React, { useState, useEffect } from "react"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"

const SimilarArtistCard = ({ name, match, queriedArtist, mbid }) => {
  const [listeners, setListeners] = useState()
  const [playCount, setPlayCount] = useState()
  const [tags, setTags] = useState()
  const key = process.env.REACT_APP_KEY

  useEffect(() =>{
    const query = mbid ? `mbid=${mbid}` : `artist=${encodeURIComponent(name)}`
    fetch(`http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getinfo&${query}&api_key=${key}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("From card", result)
          setListeners(parseInt(result.artist.stats.listeners).toLocaleString())
          setPlayCount(parseInt(result.artist.stats.playcount).toLocaleString())
          setTags(result.artist.tags.tag.map(tag => tag.name).join(', '))
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }, [key, mbid])

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {match}% similar to {queriedArtist}
        </Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroupItem>Listeners: {listeners}</ListGroupItem>
        <ListGroupItem>Play count: {playCount}</ListGroupItem>
        <ListGroupItem>Tags: {tags}</ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default SimilarArtistCard
