"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const models_1 = require("./models");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const assetRoutes_1 = __importDefault(require("./routes/assetRoutes"));
const responseRoutes_1 = __importDefault(require("./routes/responseRoutes"));
const rssRoutes_1 = __importDefault(require("./routes/rssRoutes"));
const cors = require("cors");
const app = (0, express_1.default)();
const port = process.env.PORT || "5000";
const corsOptions = {
    origin: ["https://worship-grid-ui.vercel.app"]
};
app.get("/", (_req, res) => {
    return res.send("Express Typescript on Vercel");
});
app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
const stripe = require("stripe")(process.env.STRIPE_SK_CODE);
app.use(cors(corsOptions));
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/server/users", userRoutes_1.default);
app.use("/server/assets", assetRoutes_1.default);
app.use("/server/responses", responseRoutes_1.default);
app.use("/server/rss", rssRoutes_1.default);
app.post("/server/checkout", async (req, res) => {
    console.log("Received checkout request");
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push({
            price: item.merch_id,
            quantity: item.qty
        });
    });
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: "https://worship-grid-ui.vercel.app/paysuccessful",
        cancel_url: "https://worship-grid-ui.vercel.app/paycanceled"
    });
    res.send(JSON.stringify({
        url: session.url
    }));
});
app.use((req, res, next) => {
    res.status(404).end();
});
// Syncing our database
models_1.db.sync({ alter: false }).then(() => {
    console.info("connected to the database!");
});
// app.listen(5000);
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map