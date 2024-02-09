import './App.css';
import React, { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import MoviesList from './components/MoviesList';
import MovieTitle from './components/MovieTitle';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

function App() {

  const[movies, setMovies] = useState([])
  const[favorite, setFavorite] = useState([])
  const[searchValue, setSearchValue] = useState('')

  const getMovieRequest = async (searchValue) => {

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=fdd45392`;

    const response = await fetch(url)
    const responseJson = await response.json()

    console.log(responseJson)
    if(responseJson.Search) {
      setMovies(responseJson.Search)
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue); 
  },[searchValue])

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('react-movie-app-favorites')
    )

    setFavorite(movieFavorites)
  },[])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
  }

  const addFavoritesMovies = (movie) => {
    const newFavoriteList = [...favorite, movie]
    setFavorite(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  const removeFavoritesMovies = (movie) => {
    const newFavoriteList = favorite.filter(
      (fav) => fav.imdbID !== movie.imdbID
    )

    setFavorite(newFavoriteList)
  }

  return (
    <div className='movie-app'>
      <div className='row'>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='movie-row'>
        <MoviesList 
          movies={movies} 
          handleFavoriteClick={addFavoritesMovies} 
          favoriteComponents={AddFavorites} 
        />
      </div>
      <div>
        <MovieTitle heading="Favorites"/>
      </div>
      <div className='movie-row'>
        <MoviesList 
          movies={favorite} 
          handleFavoriteClick={removeFavoritesMovies} 
          favoriteComponents={RemoveFavorites} 
        />
      </div>
    </div>
  );
}

export default App;
