# Movie Gallery

## Description

_Duration: 24 hours

This project required updates to an existing app. The features I added: a form to add more movies to the gallery, an expanded detail view for each movie that displays all of the movie details (movie title, movie poster, and the movie description) when you click on the movie poster, and an edit page to change the movie details. I expanded the GET route in the movie router and added a GET route in the genre router to display the genres for a selected movie

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/download/)
- Code editor of your choice

## Installation

1. Create a database named `saga-movies-weekend`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. View the movies on the home page
2. Click the add movie button to add a movie
3. Fill out the required fields (if you do not have a movie poster image, a placeholder image is the 'poster' input default)
4. Click save to add the new movie to the home page
5. Click cancel to go back to the home page without adding the movie
6. Click the movie poster image to redirect to the details page for the movie
7. The back to home button will navigate you back to the home page
8. The edit button will navigate you to the edit page for that movie
9. Make the necessary changes to the title and description (updating the genres is under construction)
10. Click save to submit your changes and navigate back to the details page
11. The cancel button will take you back to the details page without making changes


## Built With

List technologies and frameworks here

- Visual Code Studio
- Postman
- pg
- Express
- React
- React Redux
- Redux Saga
- Postico
- Redux Logger
- React Router Dom

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at preston.thomas355@gmail.com
