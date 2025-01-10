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

    res.json(correctImagePath(results));
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

    res.json(correctImagePath(results));
  });
}

function correctImagePath(movies) {
  return movies.map((movie) => ({
    ...movie,
    image: `http://${APP_HOST}:${APP_PORT}/movies_cover/${movie.image}`,
  }));
}

module.exports = { index, show };
