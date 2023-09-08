import React, { useState, useEffect } from "react";
import axios from "axios"
import Movie from "./components/Movie";
import AddMovieForm from "./components/AddMovieForm";

function App() {
    const [movies, setMovies] = useState([])

    function getMovies() {
        axios.get("/movies")
            .then(res => setMovies(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addMovie(newMovie) {
        axios.post("/movies", newMovie)
            .then(res => {
                setMovies(prevMovies => [...prevMovies, res.data])
            })
            .catch(err => console.log(err))
    }

    function deleteMovie(movieId) {
        axios.delete(`/movies/${movieId}`)
            .then(res => {
                setMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId))
            })
            .catch(err => console.log(err))
    }

    function editMovie(movieId, updatedMovie) {
        axios.put(`/movies/${movieId}`, updatedMovie)
            .then(res => {
                setMovies(prevMovies => prevMovies.map(movie => movie._id !== movieId ? movie : res.data))
            })
            .catch(err => console.log(err))
    }

    function handleFilter(event) {
        if (event.target.value === "reset") {
            getMovies()
        } else {
            axios.get(`movies/search/genre?genre=${event.target.value}`)
                .then(res => setMovies(res.data))
                .catch(err => console.log(err))
        }

    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div className="movie-container">
            <AddMovieForm
                addMovie={addMovie}
            />

            <h4>Filter by genre</h4>
            <select onChange={handleFilter} className="filter-form">
                <option value="reset">All movies</option>
                <option value="fantasy">Fantasy</option>
                <option value="classic">Classic</option>
                <option value="comedy">Comedy</option>
                <option value="horror">Horror</option>
            </select>

            {
                movies.map(movie =>
                    <Movie
                        {...movie}
                        key={movie.title}
                        deleteMovie={deleteMovie}
                        handleEdit={editMovie} />)
            }
        </div>
    )
}

export default App;