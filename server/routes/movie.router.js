const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  // this conditional path runs a query
  // that grabs all of the table data
  // from movies if a movie id is 
  // not specified in the request query
  if (req.query.movieId === undefined) {
    const query = `SELECT * FROM movies ORDER BY "title" ASC`;
    pool.query(query)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all movies', err);
        res.sendStatus(500)
      })
  }

  // this conditional path runs a query
  // that grabs one table row by its id
  // from movies if a movie id is 
  // specified in the request query
  else {
    const movieId = req.query.movieId

    const query = `SELECT * FROM movies WHERE "movies".id = $1`;
    pool.query(query, [movieId])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get featured movies', err);
        res.sendStatus(500)
      })
  }


});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

      // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

// server side put to run updates
router.put('/', (req, res) => {

  // make the id to change available
  const movieId = req.query.movieId;

  // break up the update info
  const updatedDescription = req.body.description;
  const updatedTitle = req.body.title;
  console.log(updatedDescription, updatedTitle);
  // const genresArray = req.body.genres;

  // write query to run update
  const updateTitle = `
   UPDATE "movies" 
   SET "title" = $1
   WHERE "movies".id = $2
  ;`
  // send query to DB
  pool.query(updateTitle, [updatedTitle, movieId])

    // async gets a result
    .then(result => {

      // now update the description
      const updateDescription = `
    UPDATE "movies" 
    SET "description" = $1
    WHERE "movies".id = $2
    ;`

      pool.query(updateDescription, [updatedDescription, movieId])
        .then(result => {
          res.sendStatus(204);
        })
        .catch(e => {
          res.sendStatus(500);
        })

    })

    // catch for error
    .catch(e => {
      console.log(`Error updating rows ${e}`);
    })
})

module.exports = router;