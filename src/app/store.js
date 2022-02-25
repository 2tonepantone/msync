import { configureStore } from '@reduxjs/toolkit'
import artistReducer from '../features/artists/artistsSlice'
import listReducer from '../features/artists/listsSlice'

export default configureStore({
  reducer: {
    artists: artistReducer,
    lists: listReducer,
  },
})
