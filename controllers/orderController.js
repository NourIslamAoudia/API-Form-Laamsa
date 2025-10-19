const prisma = require("../lib/prisma");

const orderController = {
  createCommande: async (req, res) => {
    try {
      // Les données sont déjà validées et sanitizées par le middleware
      const {
        nom,
        telephone,
        wilaya_code,
        wilaya,
        commune,
        livraison,
        nombre_cartes,
        prix_total,
        reseaux_sociaux,
      } = req.body;

      // Création de la commande avec les données validées
      const commande = await prisma.visit_card.create({
        data: {
          nom: nom.trim(),
          telephone: telephone.trim(),
          wilaya_code: wilaya_code || null,
          wilaya: wilaya?.trim() || null,
          commune: commune?.trim() || null,
          livraison: livraison?.trim() || null,
          nombre_cartes: nombre_cartes || 1,
          prix_total: prix_total || null,
          reseaux_sociaux: reseaux_sociaux?.trim() || null,
          statut: "EN_ATTENTE",
        },
      });

      res.status(201).json({
        success: true,
        message: "✅ Commande créée avec succès",
        commande,
      });
    } catch (err) {
      console.error("Erreur Prisma :", err);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création de la commande",
      });
    }
  },
};

module.exports = orderController;
