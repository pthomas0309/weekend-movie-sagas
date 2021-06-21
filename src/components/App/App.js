import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'

// bring in DetailsView component
import DetailsView from '../DetailsView/DetailsView';

// bring in MovieForm component
import MovieForm from '../MovieForm/MovieForm'

function App() {
  return (
    <Router>        
      <div className="App">
        <h1>The Movies Saga!</h1>

          <Route path="/" exact>
            <nav>
              <button><Link to="/addMovie">+ Add Movie</Link></button>
            </nav>
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
      </div>
    </Router>
  );
}


export default App;
