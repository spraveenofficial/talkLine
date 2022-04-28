import express from "express";
import { createBookmark } from "../controllers/bookmark-controller.js";
import middleware from "../middlewares/middleware.js";

const app = express.Router();

app.use(middleware);

app.route("/").post(createBookmark);

export default app;
