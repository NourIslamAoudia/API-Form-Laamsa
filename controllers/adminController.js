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
      // L'ID est déjà validé par le middleware
      const id = parseInt(req.params.id, 10);

      const order = await prisma.visit_card.findUnique({
        where: { id_commande: id },
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
      // L'ID et le statut sont déjà validés par le middleware
      const id = parseInt(req.params.id, 10);
      const { statut } = req.body;

      const updatedOrder = await prisma.visit_card.update({
        where: { id_commande: id },
        data: { statut },
      });

      res.status(200).json({
        success: true,
        message: "Statut mis à jour avec succès.",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);

      // Gestion de l'erreur si la commande n'existe pas
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "Commande non trouvée.",
        });
      }

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
      // L'ID est déjà validé par le middleware
      const id = parseInt(req.params.id, 10);

      await prisma.visit_card.delete({
        where: { id_commande: id },
      });

      res.status(200).json({
        success: true,
        message: "Commande supprimée avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande :", error);

      // Gestion de l'erreur si la commande n'existe pas
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "Commande non trouvée.",
        });
      }

      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la suppression de la commande.",
      });
    }
  },
};

module.exports = orderController;
