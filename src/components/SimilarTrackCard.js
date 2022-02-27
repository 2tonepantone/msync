import React, { useState, useEffect } from "react"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addArtist } from "../features/artists/artistsSlice"
import SaveButton from "./SaveButton"

const SimilarTrackCard = ({ trackData, match, queriedTrack }) => {
  const [listeners, setListeners] = useState()
  const [tags, setTags] = useState()
  const key = process.env.REACT_APP_KEY
  const dispatch = useDispatch()
  const { name, playcount, artist } = trackData

  useEffect(() => {
    const query = trackData.mbid ? `mbid=${trackData.mbid}` : `artist=${encodeURIComponent(name)}&track=${encodeURIComponent(name)}`
    fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${key}&${query}&format=json`)
      .then(res => res.json())
      .then(
        (result) => {
          setListeners(parseInt(result.track.listeners).toLocaleString())
          setTags(result.track.toptags.tag.map(tag => tag.name).join(', '))
          // dispatch(addArtist({ [result.artist.name]: result.artist }))
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }, [trackData.mbid, name])

  const handleClick = () => {
    document.getElementById('artistSearchInput').value = ''
    document.getElementById('trackSearchInput').value = ''
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          {name} <SaveButton artistName={name} />
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {match && `${match}% similar to "${queriedTrack}"`}
        </Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroupItem>Artist: {artist.name}</ListGroupItem>
        <ListGroupItem>Play count: {parseInt(playcount).toLocaleString()}</ListGroupItem>
        <ListGroupItem>Listeners: {listeners}</ListGroupItem>
        <ListGroupItem>Tags: {tags}</ListGroupItem>
        <ListGroupItem>
          <Link to={`/track/${name}`} onClick={handleClick}>More track info</Link>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default SimilarTrackCard