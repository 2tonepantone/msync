import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import SimilarArtists from './routes/SimilarArtists'
import ArtistDetail from './routes/ArtistDetail'
import reportWebVitals from './reportWebVitals'
import store from './app/store'
import { Provider } from 'react-redux'
import ScrollToTop from './ScrollToTop'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="artists">
              <Route path=":artist" element={<SimilarArtists />} />
            </Route>
          </Route>
          <Route path="/artist">
            <Route path=":artist" element={<ArtistDetail />} />
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
