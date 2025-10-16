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

app.get("/insert-example", async (req, res) => {
  try {
    const [result] = await db.query(`
      INSERT INTO commandes (
        date_heure,
        nom,
        telephone,
        wilaya_code,
        wilaya,
        commune,
        nombre_cartes,
        prix_total,
        reseaux_sociaux,
        statut
      ) VALUES (
        NOW(),
        'Nour Islam Aoudia',
        '0550123456',
        16,
        'Alger',
        'El Madania',
        2,
        2000.00,
        '@islam.lemgale3',
        'En attente'
      )
    `);

    res.json({
      message: "✅ Exemple inséré avec succès",
      insertId: result.insertId,
    });
  } catch (err) {
    console.error("Erreur MySQL :", err);
    res.status(500).json({ error: "Erreur lors de l’insertion" });
  }
});

app.listen(port, () => console.log(`✅ Serveur lancé sur le port ${port}`));
