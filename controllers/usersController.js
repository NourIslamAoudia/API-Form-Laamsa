const prisma = require("../lib/prisma");

const usersController = {
  /* ----------------------------------------
     Get all users
  -----------------------------------------*/
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur",
      });
    }
  },
  getUserCommandes: async (req, res) => {
    try {
      const commandes = await prisma.visit_card.findMany();
      res.json(commandes);
    } catch (err) {
      console.error("Erreur Prisma :", err);
      res.status(500).json({ error: "Erreur lors de la lecture" });
    }
  },
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

module.exports = usersController;
