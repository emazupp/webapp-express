// CONFIG EXPRESS
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

// GETTING VARIABLES FROM ENV
const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

// HOMEPAGE ROUTE
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// MOVIESROUTER ROUTE
const moviesRouter = require("./routers/moviesRouter");
app.use("/movies", moviesRouter);

// SERVER LISTENING
app.listen(port, () => {
  console.log(`Server listening on: http://${host}:${port}`);
});
