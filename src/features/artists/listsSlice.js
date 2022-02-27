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
  },
})

export const { addItem, deleteItem } = listsSlice.actions
export default listsSlice.reducer
