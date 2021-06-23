// bring in useState & useEffect
import { useState, useEffect } from 'react';

// bring in useParams
import { useParams, useHistory } from 'react-router-dom';

// bring in useDispatch
import { useDispatch, useSelector } from 'react-redux'

function EditMovie() {

    // make useHistory available as history
    const history = useHistory();

    // make the movieId from the params available
    const { movieId } = useParams();

    // on page load dispatch to get request saga
    // with the payload of the movie clicked
    // and dispatch to the rootSaga to update the state
    // of the featured movie 
    useEffect(() => {
        console.log('in UseEffect');
        dispatch({
            type: 'FETCH_FEATURED',
            payload: movieId
        });
        dispatch({
            type: 'FETCH_FEATURED_GENRES',
            payload: movieId
        });
    }, []);

    // bring in both reducer states
    const movies = useSelector(store => store.movies);
    const genreList = useSelector(store => store.genres.genreList)

    // make useDispatch available as dispatch
    const dispatch = useDispatch();

    // set useState for the new movie details
    const [updatedMovieDetails, setUpdatedMovieDetails] = useState({
        title: movies.featured.title,
        description: movies.featured.description,
        genres: []
    })

    // function to track updated to the movie details
    const updateMovie = event => {
        switch (event.target.name){
            case 'genres':
                return setUpdatedMovieDetails({...updatedMovieDetails, [event.target.name]: [...updatedMovieDetails.genres, event.target.value]})
            case 'description':
                event.preventDefault();
                return setUpdatedMovieDetails({...updatedMovieDetails, [event.target.name]: event.target.value})
            case 'title':
                event.preventDefault();
                return setUpdatedMovieDetails({...updatedMovieDetails, [event.target.name]: event.target.value})
        }

    }

    // function to send the updated values to the server
    const sendUpdates = event => {

        // stop page loading
        event.preventDefault();

        // dispatch to root saga
        dispatch({
            type: 'SEND_UPDATES',
            payload: {updates: updatedMovieDetails, idToUpdate: movieId}
        });

        // move back to details page
        history.push(`/${movieId}/details`)

    }

    // function to move back to details page
    const navigateBack = () => {

        // alert for redirect
        alert('Going back to previous page');
        
        // use history to move to previous url
        history.goBack();
    }

    console.log(updatedMovieDetails);
    return (
        <>
            <form onSubmit={sendUpdates}>

                <label htmlFor="featured_title">Movie Title:
                    <input onChange={updateMovie} name="title" type="text" id="featured_title" value={updatedMovieDetails.title} />
                </label>
                <br />
                <label htmlFor="featured_description">Movie Description:
                    <input onChange={updateMovie} name="description" type="text" id="featured_description" value={updatedMovieDetails.description} />
                </label>

                <h4>To Be Implemented: UPDATE GENRES</h4>

                {genreList.map((genre, i) => {
                    return <div key={i} >
                            <label htmlFor={genre.name}>{genre.name}
                                <input onChange={updateMovie} value={i + 1} type="checkbox" id={genre.name} name="genres" />
                            </label>
                           </div>
                })}

                <input type="submit" value="save" />
                <input onClick={navigateBack} type="button" value="cancel" />
            </form>
        </>
    )
}

export default EditMovie;