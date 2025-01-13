// CONFIG EXPRESS
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));
const cors = require("cors");

// GETTING VARIABLES FROM ENV
const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

// MIDDLEWARES
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// HOMEPAGE ROUTE
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// MOVIESROUTER ROUTE
const moviesRouter = require("./routers/moviesRouter");
app.use("/movies", moviesRouter);

// ERROR HANDLERS
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorHandler");

app.use(errorsHandler);
app.use(notFound);

// SERVER LISTENING
app.listen(port, () => {
  console.log(`Server listening on: http://${host}:${port}`);
});
