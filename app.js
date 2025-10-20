const express = require("express");
require("dotenv").config();
const protectedRoute = require("./midleware/auth-middleware");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

// === Middlewares globaux ===
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Protection NoSQL Injection
app.use(
  mongoSanitize({
    replaceWith: "_",
    onSanitize: ({ req, key }) => {
      console.warn(`⚠️ Tentative d'injection détectée dans ${key}`);
    },
  })
);

// === Routes ===
const authRouter = require("./routers/auth");
const OrderRouter = require("./routers/order");
const AdminRouter = require("./routers/admin");

app.use("/addorder", OrderRouter);
app.use("/", authRouter);
app.use("/admin", protectedRoute, AdminRouter);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API des commandes de cartes de visite !");
});

// === Export pour Vercel ===
if (process.env.NODE_ENV !== "vercel") {
  // Lancement local uniquement
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`✅ API en ligne sur le port: http://localhost:${PORT}`)
  );
}

module.exports = app;
