import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import SimilarArtists from './routes/SimilarArtists'
import ArtistDetail from './routes/ArtistDetail'
import ArtistLists from './routes/ArtistLists'
import reportWebVitals from './reportWebVitals'
import store from './app/store'
import { Provider } from 'react-redux'
import ScrollToTop from './ScrollToTop'
import { Container } from 'react-bootstrap'
import SimilarTracks from './routes/SimilarTracks'
import TrackDetail from './routes/TrackDetail'
import TrackLists from './routes/TrackLists'
import IndexComponent from './routes/IndexComponent'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<IndexComponent pageType="home" />} />
            <Route path="artists/:artist" element={<SimilarArtists />} />
            <Route path="artist/:artist" element={<ArtistDetail />} />
            <Route path="lists/artists" element={<ArtistLists />} />
            <Route path="tracks/:artist/:trackName" element={<SimilarTracks />} />
            <Route path="track/:artist/:trackName" element={<TrackDetail />} />
            <Route path="lists/tracks" element={<TrackLists />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
