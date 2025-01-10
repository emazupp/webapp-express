// CONFIG EXPRESS
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

app.listen(port, () => {
  console.log(`Server listening on: http://${host}:${port}`);
});
