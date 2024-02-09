import React from 'react'

const MoviesList = (props) => {
 

  const FavoriteComponents = props.favoriteComponents;
  

  return (
    <>
      {props.movies.map((movie, index) => (
        <div key={index} className='movie-list'>
            <img key={movie.imdbID} src={movie.Poster} width={200} alt='movie'></img>
            <div className='overlay' onClick={() => props.handleFavoriteClick(movie)}>
                <FavoriteComponents />
            </div>
        </div>
      ))}
    </>
  )
}

export default MoviesList
