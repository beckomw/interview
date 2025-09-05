import express from "express";
import path from "path";
import products from "./data/products.json" assert { type: "json" };
import cartAPI from "./cartAPI.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log(req.path);
	next();
});

// CART
cartAPI(app);

// SERVE STATIC PAGES
app.use(express.static(path.join(process.cwd(), "/src/static"), { extensions: ["html"] }));

// ~~~~~ API ~~~~~ //
app.get("/products", (req, res) => {
	res.send(products);
});

app.listen(3005, (...e) => console.log("Server Started", e));
