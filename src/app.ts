import express from "express";
import morgan from "morgan";
import { db } from "./models";
import userRoutes from "./routes/userRoutes";
import assetRoutes from "./routes/assetRoutes";
import responseRoutes from "./routes/responseRoutes";
import rssRoutes from "./routes/rssRoutes";

const cors = require("cors");

const app = express();
const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:5001"]
};

const stripe = require("stripe")(process.env.STRIPE_SK_CODE);

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/server/users", userRoutes);
app.use("/server/assets", assetRoutes);
app.use("/server/responses", responseRoutes);
app.use("/api/rss", rssRoutes);
app.post("/server/checkout", async (req, res) => {
  console.log("Received checkout request");
  console.log(req.body);
  const items = req.body.items;
  let lineItems: any = [];
  items.forEach((item: any) => {
    lineItems.push({
      price: item.merch_id,
      quantity: item.qty
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5001/paysuccessful",
    cancel_url: "http://localhost:5001/paycanceled"
  });

  res.send(
    JSON.stringify({
      url: session.url
    })
  );
});

app.use((req, res, next) => {
  res.status(404).end();
});

// Syncing our database
db.sync({ alter: false }).then(() => {
  console.info("connected to the database!");
});

app.listen(5000);
