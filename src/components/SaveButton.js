import React, { useEffect, useState } from "react"
import { Dropdown, DropdownButton, Form, } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../features/artists/listsSlice"

const SaveButton = ({ artistName }) => {
  const [listTitle, setListTitle] = useState()
  const artistsData = useSelector(state => state.artists)
  const dispatch = useDispatch()
  const lists = useSelector(state => state.lists)
  const mergedLists = lists.reduce((acc, { listTitle, items }) => {
    acc[listTitle] ??= { items: [] };
    if (Array.isArray(items)) // if it's array type then concat
      acc[listTitle].items = acc[listTitle].items.concat(items);
    else
      acc[listTitle].items.push(items);

    return acc;
  }, {})

  useEffect(() => {
    listTitle && dispatch(addItem({items: artistsData[artistName], listTitle: listTitle}))
  }, [listTitle])

  const handleClick = (e) => {
    if (e.target.value) {
      setListTitle(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newListTitle = (document.getElementById('newList').value)
    newListTitle && setListTitle(newListTitle)
  }

  return (
    <DropdownButton
      size="sm"
      variant="outline-primary"
      id="dropdown-item-button"
      title="Add"
    >
      <Dropdown.Item as="button" value="Favorites" onClick={handleClick}>Favorites</Dropdown.Item>
      {Object.entries(mergedLists).map(([key]) => (
        <Dropdown.Item as="button" value={key} onClick={handleClick}>{key}</Dropdown.Item>
      ))}
      <Dropdown.Divider />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control id="newList" type="text" placeholder="New list title.." />
        </Form.Group>
      </Form>
    </DropdownButton>
  )
}

export default SaveButton
