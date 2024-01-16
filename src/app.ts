import express from "express";
import morgan from "morgan";
import { db } from "./models";
import userRoutes from "./routes/userRoutes";
import assetRoutes from "./routes/assetRoutes";
import responseRoutes from "./routes/responseRoutes";

const cors = require("cors");

const app = express();
const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:5001"]
};

app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/server/users", userRoutes);
app.use("/server/assets", assetRoutes);
app.use("/server/responses", responseRoutes);

app.use((req, res, next) => {
  res.status(404).end();
});

// Syncing our database
db.sync({ alter: false }).then(() => {
  console.info("connected to the database!");
});

app.listen(5000);
