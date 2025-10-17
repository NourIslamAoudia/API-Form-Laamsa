const prisma = require("../lib/prisma");

/* ============================================================
   🧾 orderController.js — Gestion des commandes (visit_card)
============================================================ */
const orderController = {
  /* ----------------------------------------
     🟢 GET /allorder → Récupérer toutes les commandes
  -----------------------------------------*/
  getAllOrders: async (req, res) => {
    try {
      const orders = await prisma.visit_card.findMany({
        orderBy: { date_heure: "desc" },
      });

      res.status(200).json({
        success: true,
        count: orders.length,
        orders,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des commandes.",
      });
    }
  },

  /* ----------------------------------------
     🟢 GET /order/:id → Récupérer une commande par ID
  -----------------------------------------*/
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await prisma.visit_card.findUnique({
        where: { id_commande: parseInt(id) },
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Commande non trouvée.",
        });
      }

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de la commande :", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération de la commande.",
      });
    }
  },

  /* ----------------------------------------
     🟡 PUT /order/:id/status → Mettre à jour le statut
  -----------------------------------------*/
  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { statut } = req.body;

      const validStatus = ["EN_ATTENTE", "CONFIRMEE", "LIVREE", "ANNULEE"];
      if (!validStatus.includes(statut)) {
        return res.status(400).json({
          success: false,
          message: "Statut invalide. Valeurs autorisées : EN_ATTENTE, CONFIRMEE, LIVREE, ANNULEE.",
        });
      }

      const updatedOrder = await prisma.visit_card.update({
        where: { id_commande: parseInt(id) },
        data: { statut },
      });

      res.status(200).json({
        success: true,
        message: "Statut mis à jour avec succès.",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la mise à jour du statut.",
      });
    }
  },

  /* ----------------------------------------
     🔴 DELETE /order/:id → Supprimer une commande
  -----------------------------------------*/
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.visit_card.delete({
        where: { id_commande: parseInt(id) },
      });

      res.status(200).json({
        success: true,
        message: "Commande supprimée avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande :", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la suppression de la commande.",
      });
    }
  },
};

module.exports = orderController;
