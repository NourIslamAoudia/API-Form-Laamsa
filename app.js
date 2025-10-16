const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const port = process.env.PORT || 3000;

// Route test API
app.get("/", (req, res) => {
  res.send("API Node.js connectée !");
});

// Route test DB
app.get("/test-db", async (req, res) => {
  try {
    // Exécuter plusieurs requêtes pour tester différents aspects
    const [timeResult] = await db.promise().query("SELECT NOW() AS current_time");
    const [versionResult] = await db.promise().query("SELECT VERSION() AS mysql_version");
    const [dbNameResult] = await db.promise().query("SELECT DATABASE() AS database_name");
    
    res.json({ 
      message: "Connexion DB OK ✓", 
      server_time: timeResult[0].current_time,
      mysql_version: versionResult[0].mysql_version,
      database: dbNameResult[0].database_name,
      status: "connected"
    });
  } catch (err) {
    console.error("Erreur MySQL :", err.message);
    res.status(500).json({ 
      error: "Erreur de connexion à la DB",
      details: err.message 
    });
  }
});

app.listen(port, () => console.log(`✅ Serveur lancé sur le port ${port}`));
