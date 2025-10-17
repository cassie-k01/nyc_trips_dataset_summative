// server.js
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Define path to DB
const dbPath = path.resolve(__dirname, "database", "nyc_trips.db");
console.log("🔍 Using database path:", dbPath);

// ✅ Check if DB exists
if (!fs.existsSync(dbPath)) {
  console.error("❌ Database file not found:", dbPath);
  process.exit(1);
}

// ✅ Connect to SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error connecting to database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database:", dbPath);
  }
});


// ======================= ROUTES =======================

// --- Default route ---
app.get("/", (req, res) => {
  res.send("🚕 NYC Trips API is running!");
});

// --- List tables (for debugging) ---
app.get("/tables", (req, res) => {
  const sql = "SELECT name FROM sqlite_master WHERE type='table';";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// --- Fetch all trips (paginated) ---
app.get("/trips", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 50;
  const offset = (page - 1) * limit;

  const sql = "SELECT * FROM trips LIMIT ? OFFSET ?";
  db.all(sql, [limit, offset], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: "Failed to fetch trips" });
    } else {
      res.json(rows);
    }
  });
});

// --- Fetch trip stats (for KPI cards) ---
app.get("/trips/stats", (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS total_trips,
      ROUND(AVG(trip_distance), 2) AS avg_distance,
      ROUND(AVG(trip_duration), 2) AS avg_duration,
      ROUND(AVG(trip_speed), 2) AS avg_speed,
      ROUND(SUM(fare_amount), 2) AS total_fare
    FROM trips;
  `;
  db.get(sql, [], (err, row) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(row);
    }
  });
});

// --- Hourly breakdown (for charts) ---
app.get("/trips/hour/:hour", (req, res) => {
  const hour = req.params.hour;
  const sql = `
    SELECT hour_of_day, COUNT(*) AS trip_count
    FROM trips
    WHERE hour_of_day = ?
    GROUP BY hour_of_day;
  `;
  db.all(sql, [hour], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
});

// --- Top Drivers ---
app.get("/drivers/top", (req, res) => {
  const sql = `
    SELECT 
      driver_name AS name,
      COUNT(*) AS trips,
      ROUND(SUM(fare_amount), 2) AS earnings,
      ROUND(AVG(trip_speed), 2) AS avg_speed
    FROM trips
    GROUP BY driver_name
    ORDER BY earnings DESC
    LIMIT 5;
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
});

// --- Top Riders ---
app.get("/riders/top", (req, res) => {
  const sql = `
    SELECT 
      passenger_id AS rider_id,
      COUNT(*) AS trips,
      ROUND(SUM(fare_amount), 2) AS total_spent
    FROM trips
    GROUP BY passenger_id
    ORDER BY total_spent DESC
    LIMIT 5;
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
});

// --- Payments Summary ---
app.get("/payments", (req, res) => {
  const sql = `
    SELECT 
      payment_type, 
      COUNT(*) AS count, 
      ROUND(SUM(fare_amount), 2) AS total
    FROM trips
    GROUP BY payment_type;
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(rows);
    }
  });
});

// --- 404 fallback ---
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

