import { configureStore } from '@reduxjs/toolkit'
import artistReducer from '../features/artists/artistsSlice'

export default configureStore({
  reducer: {
    artists: artistReducer,
  },
})
