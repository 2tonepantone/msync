import React from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { deleteItem, deleteList } from "../features/artists/listsSlice"

const DeleteButton = ({ target, targetType }) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    targetType === 'list' ? dispatch(deleteList(target)) : dispatch(deleteItem(target))
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
