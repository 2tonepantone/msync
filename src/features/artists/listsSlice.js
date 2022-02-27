import { createSlice } from '@reduxjs/toolkit'

export const listsSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload)
    },
    deleteItem: (state, action) => {
      return [
        ...state,
        state.filter(obj => obj.items.name !== action.payload)
      ]
    },
  },
})

export const { addItem, deleteItem } = listsSlice.actions
export default listsSlice.reducer
