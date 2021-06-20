const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  // make req.query available as movieId
  const movieId = req.query.movieId
  console.log(movieId);

  // Add query to get all genres
  const queryString = `SELECT "movies".id, ARRAY_AGG( "name" 
                       ORDER BY "name" ASC) "genre"
                       FROM "movies"
                       JOIN "movies_genres"
                       ON "movies_genres".movie_id = "movies".id
                       JOIN "genres"
                       ON "genres".id = "movies_genres".genre_id
                       WHERE "movies".id = $1
                       GROUP BY "movies".id;`

  // inject the select statement into DB
  pool.query(queryString, [movieId]) 

  // async call creates a result
  .then( result => {
    res.send(result.rows);
  })

  // catch for error
  .catch( e => {
    console.log('Error getting genres: ', e);
    res.sendStatus(500)
  });
});

module.exports = router;