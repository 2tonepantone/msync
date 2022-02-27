import React, { useEffect, useState, useRef } from "react"
import { Dropdown, DropdownButton, Form, } from "react-bootstrap"
import { connect, useDispatch, useSelector } from "react-redux"
import { addItem } from "../features/artists/listsSlice"

const SaveButton = ({ artistName, lists }) => {
  const [listTitle, setListTitle] = useState()
  const artistsData = useSelector(state => state.artists)
  const input = useRef()
  const dispatch = useDispatch()
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

  const capitalize = (string) => (string.charAt(0).toUpperCase() + string.slice(1))

  const handleClick = (e) => {
    const newListTitle = e.target.value
    newListTitle && setListTitle(capitalize(newListTitle))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newListTitle = input.current.value
    newListTitle && setListTitle(capitalize(newListTitle))
  }

  return (
    <DropdownButton
      size="sm"
      variant="outline-primary"
      id="dropdown-item-button"
      title="Add"
    >
      {Object.entries(mergedLists).map(([key]) => (
        <Dropdown.Item as="button" value={key} onClick={handleClick}>{key}</Dropdown.Item>
      ))}
      <Dropdown.Divider />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            className="newList"
            ref={input}
            type="text"
            placeholder="New list title.." />
        </Form.Group>
      </Form>
    </DropdownButton>
  )
}

function mapStateToProps(state) {
  return { lists: state.lists };
}

export default connect(mapStateToProps)(SaveButton)
