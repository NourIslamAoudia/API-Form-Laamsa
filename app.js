const express = require("express");
const prisma = require("./prismaClient");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API des commandes de cartes de visite !");
});

// 🧠 Route pour insérer une commande
app.post("/commandes", async (req, res) => {
  try {
    const commande = await prisma.visit_card.create({
      data: {
        nom: req.body.nom,
        telephone: req.body.telephone,
        wilaya_code: req.body.wilaya_code,
        wilaya: req.body.wilaya,
        commune: req.body.commune,
        nombre_cartes: req.body.nombre_cartes || 1,
        prix_total: req.body.prix_total,
        reseaux_sociaux: req.body.reseaux_sociaux,
        statut: "EN_ATTENTE", // Changed to match enum
      },
    });

    res.json({ message: "✅ Commande créée", commande });
  } catch (err) {
    console.error("Erreur Prisma :", err);
    res.status(500).json({ error: "Erreur lors de la création" });
  }
});

// 🧠 Route pour lire toutes les commandes
app.get("/commandes", async (req, res) => {
  try {
    const commandes = await prisma.visit_card.findMany();
    res.json(commandes);
  } catch (err) {
    console.error("Erreur Prisma :", err);
    res.status(500).json({ error: "Erreur lors de la lecture" });
  }
});

app.listen(3000, () =>
  console.log("✅ API Prisma en ligne sur le port: http://localhost:3000")
);
