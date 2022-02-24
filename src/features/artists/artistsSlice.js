import { createSlice } from '@reduxjs/toolkit'

export const artistsSlice = createSlice({
  name: 'artists',
  initialState: {},
  reducers: {
    addArtist: (state, action) => {
      return {...state, ...action.payload}
    },
  },
})

export const { addArtist } = artistsSlice.actions
export default artistsSlice.reducer
