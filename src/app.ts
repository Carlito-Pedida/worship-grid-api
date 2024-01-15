import express from "express";
import morgan from "morgan";
import { db } from "./models";
import userRoutes from "./routes/userRoutes";

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
app.use("/serve/user", userRoutes);

app.use((req, res, next) => {
  res.status(404).end();
});

// Syncing our database
db.sync({ alter: true }).then(() => {
  console.info("connected to the database!");
});

app.listen(5000);
