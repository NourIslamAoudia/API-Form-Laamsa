// middleware/validation-middleware.js
const { body, param, validationResult } = require("express-validator");

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Erreur de validation",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Validation pour la création de commande
const validateCreateOrder = [
  body("nom")
    .trim()
    .notEmpty()
    .withMessage("Le nom est requis")
    .isLength({ min: 2, max: 100 })
    .withMessage("Le nom doit contenir entre 2 et 100 caractères")
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage("Le nom contient des caractères invalides"),

  body("telephone")
    .trim()
    .notEmpty()
    .withMessage("Le téléphone est requis")
    .matches(/^(0|\+213|00213)[5-7][0-9]{8}$/)
    .withMessage("Numéro de téléphone algérien invalide"),

  body("wilaya_code")
    .optional()
    .isInt({ min: 1, max: 58 })
    .withMessage("Code wilaya invalide (doit être entre 1 et 58)"),

  body("wilaya")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Nom de wilaya trop long")
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage("Nom de wilaya contient des caractères invalides"),

  body("commune")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Nom de commune trop long")
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage("Nom de commune contient des caractères invalides"),

  body("livraison")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Adresse de livraison trop longue"),

  body("nombre_cartes")
    .optional()
    .isInt({ min: 1, max: 10000 })
    .withMessage("Nombre de cartes invalide (entre 1 et 10000)"),

  body("prix_total")
    .optional()
    .isFloat({ min: 0, max: 999999.99 })
    .withMessage("Prix total invalide"),

  body("reseaux_sociaux")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Texte réseaux sociaux trop long"),

  handleValidationErrors,
];

// Validation pour la connexion
const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Le nom d'utilisateur est requis")
    .isLength({ min: 3, max: 50 })
    .withMessage("Le nom d'utilisateur doit contenir entre 3 et 50 caractères")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Le nom d'utilisateur contient des caractères invalides"),

  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),

  handleValidationErrors,
];

// Validation pour l'ID dans les paramètres
const validateOrderId = [
  param("id").isInt({ min: 1 }).withMessage("ID de commande invalide"),

  handleValidationErrors,
];

// Validation pour la mise à jour du statut
const validateUpdateStatus = [
  param("id").isInt({ min: 1 }).withMessage("ID de commande invalide"),

  body("statut")
    .notEmpty()
    .withMessage("Le statut est requis")
    .isIn(["EN_ATTENTE", "CONFIRMEE", "LIVREE", "ANNULEE"])
    .withMessage(
      "Statut invalide. Valeurs autorisées : EN_ATTENTE, CONFIRMEE, LIVREE, ANNULEE"
    ),

  handleValidationErrors,
];

module.exports = {
  validateCreateOrder,
  validateLogin,
  validateOrderId,
  validateUpdateStatus,
  handleValidationErrors,
};
