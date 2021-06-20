// bring in useHistory
import { useHistory } from 'react-router-dom';

function DetailsView() {

    // make useHistory available as history
    const history = useHistory();

    // function to handle navigation to previous page
    const navigateBack = () => {

        // alert for redirect
        alert('Going back to home page to the movie list');
        
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