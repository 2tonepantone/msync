import React, { useState, useEffect } from "react"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addArtist } from "../features/artists/artistsSlice"

const SimilarArtistCard = ({ name, match, queriedArtist, mbid }) => {
  const [listeners, setListeners] = useState()
  const [playCount, setPlayCount] = useState()
  const [tags, setTags] = useState()
  const artistsData = useSelector(state => state.artists)
  const dispatch = useDispatch()

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
          dispatch(addArtist({[result.artist.name]: result.artist}))
        },
        (error) => {
          console.log("Oops!", error)
        }
      )
  }, [key, mbid, name])

  console.log(`Redux data ${Object.keys(artistsData).length}`, artistsData)

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
        <ListGroupItem><Link to={`/artist/${name}`}>More info</Link></ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default SimilarArtistCard
