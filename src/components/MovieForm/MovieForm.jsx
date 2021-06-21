// bring in useState
import { useState } from 'react';

function MovieForm() {

    // create newMovie variable with the useState function
    const [newMovie, setNewMovie] = useState({
        title: '',
        poster: '',
        description: '',
        genres: ''
    });

    // function to update the newMovie
    // object properties based on inputs
    const updateMovie = (event) => {

        // prevent page load
        event.preventDefault();

        // update movie object properties for post
        setNewMovie({
            ...newMovie,
            [event.target.name]: event.target.value
        });
    };

    console.log(newMovie);
    return (
        <form>
            <input onChange={ (event) => {updateMovie(event)}} type="text" value={newMovie.title} name="title" required/><br/>
            <input onChange={ (event) => {updateMovie(event)}} type="text" value={newMovie.poster} name="poster" required/><br/>
            <input onChange={ (event) => {updateMovie(event)}} type="text" value={newMovie.description} name="description" required/><br/>
            <select onChange={ (event) => {updateMovie(event)}} name="genres" value={newMovie.genres} required>
                <option>Choose Genre</option>
                <option>Placeholder</option>
            </select>
            <input type="submit" />
        </form>
    )
};

export default MovieForm;