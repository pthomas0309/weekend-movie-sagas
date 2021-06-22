const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', async (req, res) => {
  console.log('in genres get');
  const client = await pool.connect();


  try {

    // make req.query available as movieId
    const movieId = req.query.movieId;
    console.log(movieId);

    await client.query('BEGIN');
    console.log('starting query');

    // Add query to get all genres
    const featuredMovieGenres = await client.query(
                        `SELECT "movies".id, ARRAY_AGG( "name" 
                         ORDER BY "name" ASC) "genre"
                         FROM "movies"
                         JOIN "movies_genres"
                         ON "movies_genres".movie_id = "movies".id
                         JOIN "genres"
                         ON "genres".id = "movies_genres".genre_id
                         WHERE "movies".id = $1
                         GROUP BY "movies".id;`
                         , [movieId]);

    const allGenres = await client.query(
                        `SELECT "genres".name FROM "genres";`
                        );

    const reducerObject = {
      featured: featuredMovieGenres.rows,
      genreList: allGenres.rows
    };

    client.query('COMMIT');
    console.log(reducerObject);
    res.send(reducerObject);
  }

  catch (e) {
    await client.query('ROLLBACK');
    console.log('Error in GET genres', e);
    res.sendStatus(500);
  }

  finally {
    client.release();
  }
});

module.exports = router;