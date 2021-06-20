// bring in useHistory
import { useHistory, useParams } from 'react-router-dom';

// bring in useEffect
import { useEffect } from 'react';

// bring in useDispatch
import { useDispatch } from 'react-redux'

function DetailsView() {

    // on page load dispatch to get request saga
    // with the payload of the movie clicked
    useEffect( () => {
        dispatch({
            type: 'FETCH_GENRES',
            payload: movieId
        });
    },[]);

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

    return (
        <>
            <p>details here</p>

            <button onClick={navigateBack} >Back To Home</button>
        </>
    );
};

export default DetailsView;