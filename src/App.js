import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import NotFound from './components/NotFound'
import Search from './components/Search'
import FavoritePlace from './components/FavoritePlace'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/search/:place" element={<FavoritePlace />} />
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
