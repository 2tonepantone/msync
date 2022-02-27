import { createSlice } from '@reduxjs/toolkit'

export const trackListsSlice = createSlice({
  name: 'trackLists',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload)
    },
    deleteTrackItem: (state, action) => {
      const filteredList = state.filter(obj => obj.items.name !== action.payload)
      return [ ...filteredList ]
    },
    deleteTrackList: (state, action) => {
      const filteredLists = state.filter(obj => obj.listTitle !== action.payload)
      return [...filteredLists]
    }
  },
})

export const { addItem, deleteTrackItem, deleteTrackList } = trackListsSlice.actions
export default trackListsSlice.reducer
