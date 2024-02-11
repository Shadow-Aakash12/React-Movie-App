import './App.css';
import React, { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import MoviesList from './components/MoviesList';
import MovieTitle from './components/MovieTitle';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

function App() {

  const[movies, setMovies] = useState([
  //   {
  //     "Title": "The Avengers",
  //     "Year": "2012",
  //     "imdbID": "tt0848228",
  //     "Type": "movie",
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
  // },
  // {
  //     "Title": "Avengers: Endgame",
  //     "Year": "2019",
  //     "imdbID": "tt4154796",
  //     "Type": "movie",
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
  // },
  // {
  //     "Title": "Avengers: Infinity War",
  //     "Year": "2018",
  //     "imdbID": "tt4154756",
  //     "Type": "movie",
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
  // },
  // {
  //     "Title": "Avengers: Age of Ultron",
  //     "Year": "2015",
  //     "imdbID": "tt2395427",
  //     "Type": "movie",
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
  // }

  ])
  const[favorite, setFavorite] = useState([])
  const[searchValue, setSearchValue] = useState('')

  const getMovieRequest = async (searchValue) => {

    // Create an AbortController and get its signal
    const controller = new AbortController();
    const signal = controller.signal;

    // Set a timeout for cancellation
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=fdd45392`

    const response = await fetch(url, {signal})
    const responseJson = await response.json()
    try {

      // console.log(responseJson)

      if(responseJson.Search){
        setMovies(responseJson.Search);
      }
      
    } catch (error) {
      
      if(error.name === 'AbortError'){
        console.log('Request was aborted due to timeout');
        // Handle cancellation or timeout here
      }
      else {
        console.error('Error in the request', error)
        // Handle other errors here
      }
    }
    
    finally {
      // Clear the timeout to prevent it from triggering if the request completed before the timeout
      clearTimeout(timeoutId);
    }
    // const response = await fetch(url)
    // const responseJson = await response.json()

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
    
    // const addWatchingMovies = (movie) => {
    //   const newWatchingList = [...watching, movie]
    //   setWatching(newWatchingList)
    // }


  return (
    
    <div className='movie-app'>
        <video autoPlay loop muted id="myVideo">
            <source src="/Video/vid4.mp4" type="video/mp4" />
        </video> 
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
