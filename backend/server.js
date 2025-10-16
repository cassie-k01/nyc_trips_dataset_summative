// server.js
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite DB
const dbPath = path.resolve(__dirname, "database", "nyc_trips.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(" Error connecting to database:", err.message);
  } else {
    console.log("Connected to SQLite database:", dbPath);
  }
});


// === ROUTES ===

// 1 Get all trips (with optional limit)
app.get("/trips", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 50;
  const offset = (page - 1) * limit;

  const sql = "SELECT * FROM trips LIMIT ? OFFSET ?";
  db.all(sql, [limit, offset], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
});


// 2 Get trip statistics (e.g., average speed & distance)
app.get("/trips/stats", (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS total_trips,
      AVG(trip_distance) AS avg_distance,
      AVG(trip_duration) AS avg_duration,
      AVG(trip_speed) AS avg_speed
    FROM trips;
  `;
  db.get(sql, [], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(row);
    }
  });
});

// 3 Get a single trip by ID
app.get("/trips/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM trips WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else if (!row) {
      res.status(404).json({ message: "Trip not found" });
    } else {
      res.json(row);
    }
  });
});

// 4 Filter trips by hour_of_day
app.get("/trips/hour/:hour", (req, res) => {
  const hour = req.params.hour;
  const sql = "SELECT * FROM trips WHERE hour_of_day = ? LIMIT 50";
  db.all(sql, [hour], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
});


// 5 Default route
app.get("/", (req, res) => {
  res.send(" NYC Trips API is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
