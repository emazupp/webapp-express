const connection = require("../data/config");
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
        image: correctImagePath(movie.image),
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
      console.log("query ok");

      movie.reviews = reviews;

      res.json(movie);
    });
  });
}

function correctImagePath(image) {
  return `http://${APP_HOST}:${APP_PORT}/movies_cover/${image}`;
}

module.exports = { index, show };
