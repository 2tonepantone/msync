import { configureStore } from '@reduxjs/toolkit'
import artistReducer from '../features/artists/artistsSlice'
import listReducer from '../features/artists/listsSlice'
import trackReducer from '../features/tracks/tracksSlice'
import trackListsReducer from '../features/tracks/trackListsSlice'

export default configureStore({
  reducer: {
    artists: artistReducer,
    lists: listReducer,
    tracks: trackReducer,
    trackLists: trackListsReducer,
  },
})
