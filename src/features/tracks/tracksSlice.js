import { createSlice } from '@reduxjs/toolkit'

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState: {},
  reducers: {
    addTrack: (state, action) => {
      return {...state, ...action.payload}
    },
  },
})

export const { addTrack } = tracksSlice.actions
export default tracksSlice.reducer
