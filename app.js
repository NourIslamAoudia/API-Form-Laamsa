const express = require("express");
require("dotenv").config();
const protectedRoute = require("./midleware/auth-middleware");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const authRouter = require("./routers/auth");
const OrderRouter = require("./routers/order");
const AdminRouter = require("./routers/admin");

app.use("/addorder", OrderRouter);

app.use("/", authRouter);

app.use("/admin", protectedRoute, AdminRouter);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API des commandes de cartes de visite !");
});

app.listen(3000, () =>
  console.log("✅ API Prisma en ligne sur le port: http://localhost:3000")
);
