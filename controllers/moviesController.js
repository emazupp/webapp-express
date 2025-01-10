function index(req, res) {
  res.json({ message: "index" });
}

function show(req, res) {
  res.json({ message: "show" });
}

module.exports = { index, show };
