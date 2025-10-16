const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const port = process.env.PORT || 3000;

// Route test API
app.get("/", (req, res) => {
  res.send("ðŸš€ API Node.js connectÃ©e !");
});

// Route test DB
app.get("/test-db", (req, res) => {
  db.query("SELECT NOW() AS current_time", (err, results) => {
    if (err) {
      console.error("Erreur MySQL :", err);
      return res.status(500).json({ error: "Erreur de connexion Ã  la DB" });
    }
    res.json({ message: "âœ… Connexion DB OK", data: results });
  });
});

app.listen(port, () => console.log(`âœ… Serveur lancÃ© sur le port ${port}`));
