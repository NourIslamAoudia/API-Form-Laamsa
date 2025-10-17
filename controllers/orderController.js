const prisma = require("../lib/prisma");

const orderController = {
  createCommande: async (req, res) => {
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
  },
};

module.exports = orderController;
