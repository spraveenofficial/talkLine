import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import "./database/db.js";
import AuthRoutes from "./routes/auth-routes.js";
import PostRoutes from "./routes/post-routes.js";
import ProfileRoutes from "./routes/profile-routes.js";
import RequestRoutes from "./routes/request-routes.js";
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
app.use("/v1/api/auth/", AuthRoutes);
app.use("/v1/api/post/", PostRoutes);
app.use("/v1/api/profile/", ProfileRoutes);
app.use("/v1/api/friend/", RequestRoutes);

// Server initialize
const serverRunning = app.listen(PORT, () =>
  console.log(`App started running on ${PORT}`)
);
