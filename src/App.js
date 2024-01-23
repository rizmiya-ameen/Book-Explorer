import React from 'react'
import './styles/App.css';
import { Routes, Route } from 'react-router-dom'
import BookDetail from './BookDetail';
import NotFoundPage from './NotFoundPage'
import SearchResults from './SearchResults';
import Header from './components/Header';
import Favorite from './Favorite';
import MyShelf from './MyShelf'
import BookLibrary from './BookLibrary';
import Container from '@mui/material/Container';
import Footer from './components/Footer';


const App = () => {
  return (
    <div className="App">
      <Container >
        <Routes>

          <Route
            path='/'
            element={<div data-testid="header-component"><Header /><BookLibrary /><Footer /></div>}
          />

          <Route
            exact path='/favorite'
            element={<Favorite />}
          />

          <Route
            exact path='/myshelf'
            element={<><MyShelf /><Footer /></>}
          />

          <Route
            path=':bookID'
            element={<><BookDetail /></>}
          />

          <Route
            path='/search'
            element={<><Header /></>}
          />

          <Route
            path='/search/:queryText'
            element={<><SearchResults /><Header /></>}
          />

          <Route
            path='/genre'
            element={null}
          />

          <Route
            path='/genre/:Text'
            element={<><SearchResults /><Header /></>}
          />

          <Route
            path='*'
            element={<NotFoundPage />}
          />

        </Routes>
      </Container>

    </div>
  );
}



export default App;


