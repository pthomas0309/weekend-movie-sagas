import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);

    // listen for the FETCH_GENRES command
    yield takeEvery('FETCH_GENRES', fetchMovieDetails);

    // listen for the FETCH_FEATURED command
    yield takeEvery('FETCH_FEATURED', fetchFeatured)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

// saga generator to run the genres get request
function* fetchMovieDetails(action) {

    // try wrapper runs if there's no err
    try {

        // set variable response to the value of
        // what axios returns off the get
        const response = yield axios.get(`/api/genre/?movieId=${action.payload}`)

        // use put to set reducer with response data
        yield put({
            type: 'SET_GENRES',
            payload: response.data
        });
    }

    // catch for err
    catch (err) {
        console.error('There was an error getting genre data', err);
    }
}

// saga generator to run a get request that will grab
// one row from movies targeted by id
function* fetchFeatured(action) {

    // try wrapper runs if there's not an error
    try {

        // set response equal to the result of
        // the axios get
        const response = yield axios.get(`/api/movie/?movieId=${action.payload}`)
        console.log('Featured movie is: ', response.data);

        // use put to set state of reducer
        yield put({
            type: 'SET_FEATURED',
            payload: response.data[0]
        });
    }

    // catch for error
    catch (err) {
        console.error('There was an error getting featured movie data', err);
    };
};

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = {featured: {}, movieList: []}, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return {...state, movieList: action.payload};
        case 'SET_FEATURED':
            return { ...state, featured: action.payload}
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
