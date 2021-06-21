// bring in useState
import { useState } from 'react';

// bring in useDispatch
import { useDispatch } from 'react-redux';

// bring in useHistory
import { useHistory } from 'react-router';


function MovieForm() {

    // make useDispatch available as  dispatch
    const dispatch = useDispatch();

    // make useHistory available as history
    const history = useHistory();

    // create newMovie variable with the useState function
    const [newMovie, setNewMovie] = useState({
        title: '',
        poster: '',
        description: '',
        genre_id: ''
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
        const genre_idIn = event.target.querySelector('#genre_idIn').value

        // conditional for form validation
        if (titleIn != '' && posterIn != '' && descriptionIn != '' && genre_idIn != 0) {
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

            // navigate back to home page
            history.push('/');
        }

        // alert if any inputs are left blank or in default values
        else {
            alert('Please fill out all inputs');
        }
    };

    // function to cancel the new movie submission
    const cancelSubmission = () => {

        // clear inputs
        setNewMovie({
            title: '',
            poster: '',
            description: '',
            genres: ''
        });

        // navigate back to home page
        history.push('/');
    }

    return (
        <form onSubmit={event => addMovie(event)}>
            <input onChange={ (event) => {updateMovie(event)}} type="text" value={newMovie.title} name="title" id="titleIn" required/><br/>
            <input onChange={ (event) => {updateMovie(event)}} type="text" value={newMovie.poster} name="poster" id="posterIn" required/><br/>
            <input onChange={ (event) => {updateMovie(event)}} type="text" value={newMovie.description} name="description" id="descriptionIn" required/><br/>
            <select onChange={ (event) => {updateMovie(event)}} name="genre_id" value={newMovie.genres} id="genre_idIn" required>
                <option value="0" >Choose Genre</option>
                <option value="1" >Adventure</option>
                <option value="2" >Animated</option>
                <option value="3" >Biographical</option>
                <option value="4" >Comedy</option>
                <option value="5" >Disaster</option>
                <option value="6" >Drama</option>
                <option value="7" >Epic</option>
                <option value="8" >Fantasy</option>
                <option value="9" >Musical</option>
                <option value="10" >Romantic</option>
                <option value="11" >Science Fiction</option>
                <option value="12" >Space-Opera</option>
                <option value="13" >Superhero</option>
            </select><br/>
            <input type="submit" value="Save"/>
            <input type="button" value="Cancel" onClick={cancelSubmission} />
        </form>
    )
};

export default MovieForm;