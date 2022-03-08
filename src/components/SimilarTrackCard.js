import React, { useState, useEffect } from "react"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addTrack } from "../features/tracks/tracksSlice"
import SaveTrackButton from "./SaveTrackButton"

const SimilarTrackCard = ({ trackData, match, queriedTrack }) => {
  const [listeners, setListeners] = useState()
  const [tags, setTags] = useState()
  const key = process.env.REACT_APP_KEY
  const dispatch = useDispatch()
  const { name, playcount, artist, mbid } = trackData

  useEffect(() => {
    const query = mbid ? `mbid=${mbid}` : `artist=${encodeURIComponent(name)}&track=${encodeURIComponent(name)}`
    fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${key}&${query}&format=json`)
      .then(res => res.json())
      .then(
        (result) => {
          setListeners(parseInt(result.track?.listeners).toLocaleString())
          setTags(result.track?.toptags.tag.map(tag => tag.name).join(', '))
          dispatch(addTrack({ [name]: result.track }))
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }, [mbid, name])

  const handleClick = () => {
    document.getElementById('artistSearchInput').value = ''
    document.getElementById('trackSearchInput').value = ''
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          {name} <SaveTrackButton trackName={name} />
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {match && `${match}% similar to "${queriedTrack}"`}
        </Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroupItem>
          Artist:&nbsp;
          <Link
            to={`/artist/${artist.name}`}
            onClick={handleClick}
          >
            {artist.name}
          </Link>
        </ListGroupItem>
        <ListGroupItem>Play count: {parseInt(playcount).toLocaleString()}</ListGroupItem>
        <ListGroupItem>Listeners: {listeners || "No info"}</ListGroupItem>
        <ListGroupItem>Tags: {tags || "No info"}</ListGroupItem>
        <ListGroupItem>
          <Link to={`/track/${artist.name}/${name}`} onClick={handleClick}>More track info</Link>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default SimilarTrackCard
