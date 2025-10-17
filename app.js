const express = require("express");
require("dotenv").config();
const protectedRoute = require("./midleware/auth-middleware");
const core = require("cors");
const app = express();

app.use(express.json());

const authRouter = require("./routers/auth");
const usersRouter = require("./routers/users");

app.use("/admin", protectedRoute, usersRouter);

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API des commandes de cartes de visite !");
});

app.listen(3000, () =>
  console.log("✅ API Prisma en ligne sur le port: http://localhost:3000")
);
