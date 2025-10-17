// middleware/auth-middleware.js
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

// Middleware de protection des routes privées
const ProtectRoute = async (req, res, next) => {
  try {
    // 1️⃣ Récupération du token depuis le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Accès refusé. Token manquant ou mal formé.",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Vérification et décodage du token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Vérification de l'utilisateur dans la base
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }, // correspond à "userId" du payload du token
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur introuvable. Token invalide.",
      });
    }

    // 4️⃣ Attacher les données utilisateur à la requête
    req.user = {
      id: user.id,
      username: user.username,
    };

    // 5️⃣ Poursuivre vers le contrôleur suivant
    next();
  } catch (error) {
    console.error("Erreur d'authentification:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token invalide.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expiré.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'authentification.",
    });
  }
};

module.exports = ProtectRoute;
