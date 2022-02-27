import React from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { deleteItem, deleteList } from "../features/artists/listsSlice"
import { deleteTrackItem, deleteTrackList } from "../features/tracks/trackListsSlice"

const DeleteButton = ({ target, targetType, listType }) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (listType === 'artists') {
      targetType === 'list' ? dispatch(deleteList(target)) : dispatch(deleteItem(target))
    } else {
      targetType === 'list' ? dispatch(deleteTrackList(target)) : dispatch(deleteTrackItem(target))
    }
  }

  return (
    <Button
      size="sm"
      variant="outline-danger"
      onClick={handleDelete}
    >
      Delete
    </Button>
  )
}

export default DeleteButton
