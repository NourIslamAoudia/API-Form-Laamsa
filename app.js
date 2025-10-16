const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const port = process.env.PORT || 3000;

// Route test API
app.get("/", (req, res) => {
  res.send("API Node.js connectée !");
});

app.get("/test-db", (req, res) => {
  db.query("SHOW TABLES", (err, results) => {
    if (err) {
      console.error("Erreur MySQL :", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des tables" });
    }

    res.json({
      message: "✅ Liste des tables récupérée avec succès",
      tables: results,
    });
  });
});

app.listen(port, () => console.log(`✅ Serveur lancé sur le port ${port}`));
