import { createSlice } from '@reduxjs/toolkit'

export const listsSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload)
    },
    deleteItem: (state, action) => {
      const filteredList = state.filter(obj => obj.items.name !== action.payload)
      return [ ...filteredList ]
    },
    deleteList: (state, action) => {
      const filteredLists = state.filter(obj => obj.listTitle !== action.payload)
      return [...filteredLists]
    }
  },
})

export const { addItem, deleteItem, deleteList } = listsSlice.actions
export default listsSlice.reducer
