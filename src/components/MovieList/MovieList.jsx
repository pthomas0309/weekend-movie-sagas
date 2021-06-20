import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'

// bring in useHistory from react-router
import { useHistory } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();

    // make useHistory available as history
    const history = useHistory();

    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // function to handle redirect, takes in info of
    // the movie poster that was clicked on
    const redirectDetails = movie => {

        // alert for the redirect
        alert(`Moving to the details page of the movie ${movie.title} at id ${movie.id}`);
        
        // history.push navigates to 
        // /details/idOfTheMoviePosterClicked
        history.push(`/${movie.id}/details`);
    };

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>

                            {/* clicking on the movie poster will redirect
                            to the details page on the movie */}
                            <img onClick={() => {redirectDetails(movie)}} src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
};

export default MovieList;