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

    const redirectDetails = movieId => {
        history.push(`/details/${movieId}`)
    }

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
                            <img onClick={() => {redirectDetails(movie.id)}} src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;