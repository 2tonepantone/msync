import React from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../features/artists/listsSlice"

const SaveButton = ({ artistName }) => {
  const artistsData = useSelector(state => state.artists)
  const artistData = { [artistName]: artistsData[artistName] }
  const dispatch = useDispatch()

  return (
    <Button
      size="sm"
      variant="outline-primary"
      onClick={() => dispatch(addItem(artistData))}
    >
      Favorite
    </Button>
  )
}

export default SaveButton
