import { createSlice } from '@reduxjs/toolkit'

export const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    title: "Favorited",
    items: {},
  },
  reducers: {
    addItem: (state, action) => {
      state.items = {...state.items, ...action.payload}
    },
  },
})

export const { addItem } = listsSlice.actions
export default listsSlice.reducer
