import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'

// bring in DetailsView component
import DetailsView from '../DetailsView/DetailsView';

// bring in MovieForm component
import MovieForm from '../MovieForm/MovieForm'

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/:movieId/details">
          <DetailsView />
        </Route>

        {/* Add Movie page */}
        <Route path="/addMovie">
          <MovieForm />
        </Route>
      </Router>
    </div>
  );
}


export default App;
