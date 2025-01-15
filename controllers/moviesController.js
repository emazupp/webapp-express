const connection = require("../data/config");
const { connect } = require("../routers/moviesRouter");
const { APP_HOST, APP_PORT } = process.env;

function index(req, res) {
  const sql =
    "SELECT id, title, director, genre, release_year, image FROM movies";

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        status: "KO",
        message: "Query failed",
      });
    }
    const newResults = results.map((movie) => {
      return {
        ...movie,
        image: movie.image ? correctImagePath(movie.image) : null,
      };
    });
    res.json(newResults);
  });
}

function show(req, res) {
  const movieID = req.params.id;
  const sql = "SELECT * FROM movies WHERE movies.id = ?";

  connection.query(sql, [movieID], (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        status: "KO",
        message: "Query failed",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        status: "KO",
        message: "Movie not found",
      });
    }

    let movie = results[0];
    movie.image = correctImagePath(movie.image);

    const reviewsSql =
      "SELECT reviews.name, reviews.vote, reviews.text, reviews.updated_at FROM movies INNER JOIN reviews ON movies.id=reviews.movie_id WHERE movies.id = ?";

    connection.query(reviewsSql, [movieID], (err, reviews) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          status: "KO",
          message: "Query failed",
        });
      }

      movie.reviews = reviews;

      res.json(movie);
    });
  });
}

function store(req, res) {
  const movieID = req.params.id;
  const storeSql = `INSERT INTO movie.reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?);`;

  const { name, vote, text } = req.body;

  connection.query(storeSql, [movieID, name, vote, text], (err, results) => {
    console.log(storeSql);
    if (err) {
      console.log(err);

      return res.status(500).json({
        status: "KO",
        message: "Query failed",
      });
    }

    res.json("OK");
  });
}

function correctImagePath(image) {
  return `http://${APP_HOST}:${APP_PORT}/movies_cover/${image}`;
}

module.exports = { index, show, store };
