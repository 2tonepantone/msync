import React, { useState, useEffect } from "react"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addArtist } from "../features/artists/artistsSlice"
import SaveButton from "./SaveButton"

const SimilarArtistCard = ({ name, match, queriedArtist, mbid }) => {
  const [listeners, setListeners] = useState()
  const [playCount, setPlayCount] = useState()
  const [tags, setTags] = useState()
  const key = process.env.REACT_APP_KEY
  const dispatch = useDispatch()

  useEffect(() =>{
    const query = mbid ? `mbid=${mbid}` : `artist=${encodeURIComponent(name)}`
    fetch(`http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getinfo&${query}&api_key=${key}`)
      .then(res => res.json())
      .then(
        (result) => {
          setListeners(parseInt(result.artist.stats.listeners).toLocaleString())
          setPlayCount(parseInt(result.artist.stats.playcount).toLocaleString())
          setTags(result.artist.tags.tag.map(tag => tag.name).join(', '))
          dispatch(addArtist({[result.artist.name]: result.artist}))
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }, [mbid, name])

  const handleClick = () => document.getElementById('artistSearchInput').value = ''

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          {name} <SaveButton artistName={name} />
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {match && `${match}% similar to ${queriedArtist}`}
        </Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroupItem>Listeners: {listeners}</ListGroupItem>
        <ListGroupItem>Play count: {playCount}</ListGroupItem>
        <ListGroupItem>Tags: {tags}</ListGroupItem>
        <ListGroupItem>
          <Link to={`/artist/${name}`} onClick={handleClick}>More info</Link>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default SimilarArtistCard
