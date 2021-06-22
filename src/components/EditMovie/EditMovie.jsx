// bring in useState & useEffect
import { useState, useEffect } from 'react';

// bring in useParams
import { useParams } from 'react-router-dom';

// bring in useDispatch
import { useDispatch, useSelector } from 'react-redux'

function EditMovie({navigateBack}) {

    // bring in both reducer states
    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres[0]);

    // make useDispatch available as dispatch
    const dispatch = useDispatch();

    // on page load dispatch to get request saga
    // with the payload of the movie clicked
    // and dispatch to the rootSaga to update the state
    // of the featured movie 
    useEffect(() => {
        dispatch({
            type: 'FETCH_FEATURED_GENRES',
            payload: movieId
        });
        dispatch({
            type: 'FETCH_FEATURED',
            payload: movieId
        });
    }, []);

    // make the movieId from the params available
    const { movieId } = useParams();

    // set useState for the new movie details
    const [updatedMovieDetails, setUpdatedMovieDetails] = useState({
        title: movies.featured.title,
        description: movies.featured.description,
        genre: genres?.genre
    })

    console.log(updatedMovieDetails);
    return (
        <>
            <form>

                <label htmlFor="featured_title">Movie Title:
                    <input type="text" id="featured_title" value={updatedMovieDetails.title} />
                </label>
                <br/>
                <label htmlFor="featured_description">Movie Description: 
                    <input type="text" id="featured_description" value={updatedMovieDetails.description} />
                </label>

                <div>
                    <label htmlFor="adventure">Adventure
                        <input value="1" type="checkbox" id="adventure" />
                    </label>
                    <br/>
                    <label htmlFor="animated">Animated
                        <input value="2" type="checkbox" id="animated" />
                    </label>
                    <br/>
                    <label htmlFor="biographical">Biographical                    
                        <input value="3" type="checkbox" id="biographical" />
                    </label>
                    <br/>
                    <label htmlFor="comedy">Comedy
                        <input value="4" type="checkbox" id="comedy" />
                    </label>
                    <br/>
                    <label htmlFor="disaster">Disaster
                        <input value="5" type="checkbox" id="disaster" />
                    </label>
                    <br/>
                    <label htmlFor="drama">Drama
                        <input value="6" type="checkbox" id="drama" />
                    </label>
                    <br/>
                    <label htmlFor="epic">Epic
                        <input value="7" type="checkbox" id="epic" />
                    </label>
                    <br/>
                    <label htmlFor="fantasy">Fantasy
                        <input value="8" type="checkbox" id="fantasy" />
                    </label>
                    <br/>
                    <label htmlFor="musical">Musical
                        <input value="9" type="checkbox" id="musical" />
                    </label>
                    <br/>
                    <label htmlFor="romantic">Romantic
                        <input value="10" type="checkbox" id="romantic" />
                    </label>
                    <br/>
                    <label htmlFor="sci-fi">Science Fiction
                        <input value="11" type="checkbox" id="sci-fi" />
                    </label>
                    <br/>
                    <label htmlFor="space-opera">Space-Opera
                        <input value="12" type="checkbox" id="space-opera" />
                    </label>
                    <br/>
                    <label htmlFor="superhero">Superhero
                        <input value="13" type="checkbox" id="superhero" />
                    </label>
                </div>

                <input type="submit" value="save" />
                <input onClick={navigateBack} type="button" value="cancel" />
            </form>
        </>
    )
}

export default EditMovie;