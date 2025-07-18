const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

// Load movie data once on server startup
const rawData = fs.readFileSync(path.join(__dirname, "movies_metadata.json"));
const movies = JSON.parse(rawData);

// Test route
app.get("/api/ping", (req, res) => {
  console.log("✅ GET /api/ping");
  res.send("pong!");
});

// Get all movies (summary)
app.get("/api/movies", (req, res) => {
  console.log("✅ GET /api/movies");
  const summaries = movies.map(({ id, title, tagline, vote_average }) => ({
    id,
    title,
    tagline,
    vote_average,
  }));
  res.json(summaries);
});

// Get single movie by ID
app.get("/api/movies/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const movie = movies.find((m) => m.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

// Serve frontend in production
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log("⚠️ Do you need to set 'start': 'npm run development' in package.json?");
}

// Start the server
const listener = app.listen(port, () => {
  console.log("🚀 Express server running on port", listener.address().port);
});
