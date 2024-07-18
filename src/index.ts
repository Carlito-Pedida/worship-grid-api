import express, { Request, Response } from "express";
import morgan from "morgan";
import { db } from "./models";
import userRoutes from "./routes/userRoutes";
import assetRoutes from "./routes/assetRoutes";
import responseRoutes from "./routes/responseRoutes";
import rssRoutes from "./routes/rssRoutes";

const cors = require("cors");

const app = express();
const port = process.env.PORT || "5000";
const corsOptions = {
  origin: ["http://localhost:5001", "https://worship-grid-ui-production.vercel.app"]
};

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

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
app.use("/server/rss", rssRoutes);
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
    success_url: "https://worship-grid-ui-production.vercel.app/paysuccessful",
    cancel_url: "https://worship-grid-ui-production.vercel.app/paycanceled"
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
db.sync({ alter: true }).then(() => {
  console.info("connected to the database!");
});

// app.listen(5000);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
