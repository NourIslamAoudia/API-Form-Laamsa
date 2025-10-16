const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API Node.js connectée !");
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SHOW TABLES");
    res.json({
      message: "✅ Liste des tables récupérée avec succès",
      tables: rows,
    });
  } catch (err) {
    console.error("Erreur MySQL :", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tables" });
  }
});

app.listen(port, () => console.log(`✅ Serveur lancé sur le port ${port}`));
