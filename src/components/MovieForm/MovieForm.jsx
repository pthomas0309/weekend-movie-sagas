// bring in useState
import { useState } from 'react';

// bring in useDispatch
import { useDispatch } from 'react-redux';

function MovieForm() {

    // make useDispatch available as  dispatch
    const dispatch = useDispatch();

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

    // function to dispatch to rootSaga
    const addMovie = event => {

        // stop page load
        event.preventDefault();

        // variables for the form element children values
        const titleIn = event.target.querySelector('#titleIn').value
        const posterIn = event.target.querySelector('#posterIn').value
        const descriptionIn = event.target.querySelector('#descriptionIn').value
        const genresIn = event.target.querySelector('#genresIn').value

        // conditional for form validation
        if (titleIn != '' && posterIn != '' && descriptionIn != '' && genresIn != 'Choose Genre') {
            // dispatch POST command to root 
            // type ADD_MOVIE payload new movie object
            dispatch({
                type: 'ADD_MOVIE',
                payload: newMovie
            });
            console.log(newMovie);

            // clear inputs
            setNewMovie({
                title: '',
                poster: '',
                description: '',
                genres: ''
            });
        }

        // alert if any inputs are left blank or in default values
        else {
            alert('Please fill out all inputs');
        }
    };

    return (
        <form onSubmit={event => addMovie(event)}>
            <input onChange={ (event) => {updateMovie(event)}} type="text" value={newMovie.title} name="title" id="titleIn" required/><br/>
            <input onChange={ (event) => {updateMovie(event)}} type="text" value={newMovie.poster} name="poster" id="posterIn" required/><br/>
            <input onChange={ (event) => {updateMovie(event)}} type="text" value={newMovie.description} name="description" id="descriptionIn" required/><br/>
            <select onChange={ (event) => {updateMovie(event)}} name="genres" value={newMovie.genres} id="genresIn" required>
                <option>Choose Genre</option>
                <option>Placeholder</option>
            </select>
            <input type="submit" />
        </form>
    )
};

export default MovieForm;