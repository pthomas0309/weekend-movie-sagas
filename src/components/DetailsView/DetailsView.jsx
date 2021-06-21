// bring in useHistory
import { useHistory, useParams } from 'react-router-dom';

// bring in useEffect
import { useEffect } from 'react';

// bring in useDispatch & useSelector
import { useDispatch, useSelector } from 'react-redux'

// bring in css
import './DetailsView.css'

function DetailsView() {

    // bring in both reducer states
    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres[0]);

    // on page load dispatch to get request saga
    // with the payload of the movie clicked
    // and dispatch to the rootSaga to update the state
    // of the featured movie 
    useEffect(() => {
        dispatch({
            type: 'FETCH_GENRES',
            payload: movieId
        });
        dispatch({
            type: 'FETCH_FEATURED',
            payload: movieId
        });
    }, []);

    // make useDispatch available as dispatch
    const dispatch = useDispatch();

    // make useHistory available as history
    const history = useHistory();

    const { movieId } = useParams();

    // function to handle navigation to previous page
    const navigateBack = () => {

        // alert for redirect
        alert('Going back to previous page');

        // .goBack navigates to previous page
        history.goBack();
    };

    console.log(movies);
    console.log(genres?.genre);
    return (
        <>
            <div key={movies.featured.id} >
                <h3>{movies.featured.title}</h3>
                <img src={movies.featured.poster} alt={movies.featured.title} />
                <p>{movies.featured.description}</p>
            </div>

            <h4>Movie Genres</h4>
            <ul className="genre-list">
                {genres?.genre.map( (genre, i) => {
                    return <li key={i} >{genre}</li>
                })}
            </ul>

            <button onClick={navigateBack} >Back To Home</button>
        </>
    );
};

export default DetailsView;