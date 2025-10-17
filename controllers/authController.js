// controllers/authController.js
const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");

const { generateToken } = require("../lib/utils");

const authController = {
  /* ----------------------------------------
     Connexion (Login)
     POST /auth/login
  -----------------------------------------*/
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Vérification des champs requis
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username et password sont requis",
        });
      }

      // Recherche de l'utilisateur par username
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Identifiants incorrects",
        });
      }

      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Identifiants incorrects",
        });
      }

      // Génération du token JWT
      const token = generateToken(user.id);

      // Réponse JSON
      res.status(200).json({
        success: true,
        message: "Connexion réussie",
        token,
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur",
      });
    }
  },
};

module.exports = authController;
