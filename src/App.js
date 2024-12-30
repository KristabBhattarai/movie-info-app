import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import './styles/App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const initialSearch = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);
    const data = await response.json();
    setMovies(data.results || []);
  }

  useEffect(() => {
    initialSearch();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) return;

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);
    const data = await response.json();
    setMovies(data.results || []);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Get Movies</h1>
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch} 
        />
      </div>
      <div className="movie-results">
        {movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/NIPH.png'} 
                alt={movie.title} 
              />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p><strong>{movie.release_date ? new Date(movie.release_date).getFullYear() : '????'}</strong></p>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
      {selectedMovie && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` : '/NIPH.png'} 
              alt={selectedMovie.title} 
            />
            <div className="modal-info">
              <h2>{selectedMovie.title}</h2>
              <p><strong>Release Date:</strong> {selectedMovie.release_date ? selectedMovie.release_date : '????-??-??'}</p>
              <p><strong>Rating:</strong> {selectedMovie.vote_average}</p>
              <p>{selectedMovie.overview}</p>
              <button className="close-button" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
      <footer className="footer">
        <p>&copy; 2024 Kristab Get Movies. All rights reserved.</p>
        <p>
          <a href="https://github.com/KristabBhattarai/movie-info-app" target="_blank" rel="noopener noreferrer">Source Code</a> | 
          <a href="https://discord.gg/gear5" target="_blank" rel="noopener noreferrer"> Discord Server</a>
        </p>
      </footer>
    </div>
  );
};

export default App;