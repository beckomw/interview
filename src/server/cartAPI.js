import products from "./data/products.json" assert { type: "json" };

/**
 *
 * @param {import("express").Application} app
 */
export default function cartAPI(app) {
	// GET CART
	app.get("/api/cart", (req, res) => {
		res.send(cart);
	});

	// ADD TO CART
	app.post("/api/cart/add", (req, res) => {
		if (!req.body) return res.sendStatus(400);
		try {
			const productsToAdd = Object.entries(req.body).map(([id, quantity]) => {
				const product = products.find((p) => p.id === Number(id));
				if (!product) throw `Product ID (${id}) does not exist`;
				return { product, quantity };
			});

			for (const { product, quantity } of productsToAdd) {
				cart.addToCart(product, quantity);
			}

			res.send(cart);
		} catch (e) {
			res.status(400).send(e);
		}
	});

	// REMOVE FROM CART
	app.post("/api/cart/remove", (req, res) => {
		if (!req.body) return res.sendStatus(400);
		for (const id of req.body) {
			cart.removeFromCart(id);
		}
		res.send(cart);
	});

	// UPDATE QUANTITY
	app.post("/api/cart/update", (req, res) => {
		if (!req.body) return res.sendStatus(400);
		try {
			const productsToUpdate = Object.entries(req.body).map(([id, quantity]) => {
				const cartItem = cart.items.find((p) => Number(p.id) === Number(id));

				if (!cartItem) throw `Cart Item (${id}) does not exist`;
				return { id, quantity };
			});

			for (const { id, quantity } of productsToUpdate) {
				cart.updateQuantity(id, quantity);
			}

			res.send(cart);
		} catch (e) {
			res.status(400).send(e.message);
		}
	});
}

class Cart {
	constructor() {}

	items = [];

	addToCart(product, quantity) {
		const cartProduct = cart.items.find((item) => item.id === product.id);
		if (cartProduct) {
			cartProduct.quantity += quantity;
		} else {
			cart.items.push({
				id: product.id,
				title: product.title,
				price: product.price,
				image: product.images[0],
				quantity: +quantity,
			});
		}
	}

	updateQuantity(id, quantity) {
		const cartItem = cart.items.find((item) => +item.id === +id);
		cartItem.quantity = +quantity;
	}

	removeFromCart(id) {
		this.items = this.items.filter((i) => i.id !== id);
	}
}

// SESSION CART
const cart = new Cart();
