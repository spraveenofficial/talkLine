import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import "./database/db.js";
import AuthRoutes from "./routes/auth-routes.js";
import apiRoutes from "./routes/routes.js";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser({ limit: "50mb" }));
// Registering morgan for development
app.use(morgan("dev"));

// Registering Cors
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const PORT = process.env.PORT || 3505;

// Registering Routes
app.use("/few", apiRoutes);
app.use("/v1/api/auth/", AuthRoutes);

// Server initialize
app.listen(PORT, () => console.log(`App started running on ${PORT}`));
