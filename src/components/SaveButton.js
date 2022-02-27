import React, { useEffect, useState } from "react"
import { Dropdown, DropdownButton } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../features/artists/listsSlice"

const SaveButton = ({ artistName }) => {
  const [listTitle, setListTitle] = useState()
  const artistsData = useSelector(state => state.artists)
  const dispatch = useDispatch()

  useEffect(() => {
    listTitle && dispatch(addItem({items: artistsData[artistName], listTitle: listTitle}))
  }, [listTitle])

  const handleClick = (e) => {
    if (e.target.value) {
      setListTitle(e.target.value)
    }
  }

  return (
    <DropdownButton
      size="sm"
      variant="outline-primary"
      id="dropdown-item-button"
      title="Add"
    >
      <Dropdown.Item as="button" value="Favorites" onClick={handleClick}>Favorites</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item as="button" value="New" onClick={handleClick}>New List</Dropdown.Item>
    </DropdownButton>
  )
}

export default SaveButton
